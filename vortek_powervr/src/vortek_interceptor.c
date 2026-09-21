/*
 * Vortek Vulkan ICD Interceptor & Loader Bridge
 * Directly interposes Vulkan API entry points to apply PowerVR DXT-48 performance hooks
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dlfcn.h>
#include "../include/vortek.h"

static void *s_real_vulkan_handle = NULL;
static PFN_vkCreateRenderPass s_real_vkCreateRenderPass = NULL;
static PFN_vkCreateRenderPass2 s_real_vkCreateRenderPass2 = NULL;
static PFN_vkCreateShaderModule s_real_vkCreateShaderModule = NULL;
static PFN_vkAllocateMemory s_real_vkAllocateMemory = NULL;
static PFN_vkCreateDevice s_real_vkCreateDevice = NULL;

static void *get_real_vulkan_symbol(const char *name) {
    if (!s_real_vulkan_handle) {
        s_real_vulkan_handle = dlopen("libvulkan.so", RTLD_NOW | RTLD_GLOBAL);
        if (!s_real_vulkan_handle) {
            s_real_vulkan_handle = dlopen("/system/lib64/libvulkan.so", RTLD_NOW | RTLD_GLOBAL);
        }
    }
    if (s_real_vulkan_handle) {
        return dlsym(s_real_vulkan_handle, name);
    }
    return NULL;
}

/* Intercept vkCreateDevice to initialize hardware configuration */
VKAPI_ATTR VkResult VKAPI_CALL vkCreateDevice(
    VkPhysicalDevice physicalDevice,
    const VkDeviceCreateInfo *pCreateInfo,
    const VkAllocationCallbacks *pAllocator,
    VkDevice *pDevice) {
    
    if (!s_real_vkCreateDevice) {
        s_real_vkCreateDevice = (PFN_vkCreateDevice)get_real_vulkan_symbol("vkCreateDevice");
    }

    vortek_init_hardware_detection(physicalDevice);

    if (s_real_vkCreateDevice) {
        return s_real_vkCreateDevice(physicalDevice, pCreateInfo, pAllocator, pDevice);
    }
    return VK_ERROR_INITIALIZATION_FAILED;
}

/* Intercept vkCreateRenderPass to apply TBDR tile memory invalidation */
VKAPI_ATTR VkResult VKAPI_CALL vkCreateRenderPass(
    VkDevice device,
    const VkRenderPassCreateInfo *pCreateInfo,
    const VkAllocationCallbacks *pAllocator,
    VkRenderPass *pRenderPass) {

    if (!s_real_vkCreateRenderPass) {
        s_real_vkCreateRenderPass = (PFN_vkCreateRenderPass)get_real_vulkan_symbol("vkCreateRenderPass");
    }

    VkRenderPassCreateInfo optimizedInfo;
    if (pCreateInfo) {
        optimizedInfo = *pCreateInfo;
        vortek_optimize_render_pass(&optimizedInfo);
        pCreateInfo = &optimizedInfo;
    }

    if (s_real_vkCreateRenderPass) {
        return s_real_vkCreateRenderPass(device, pCreateInfo, pAllocator, pRenderPass);
    }
    return VK_ERROR_INITIALIZATION_FAILED;
}

/* Intercept vkCreateRenderPass2 */
VKAPI_ATTR VkResult VKAPI_CALL vkCreateRenderPass2(
    VkDevice device,
    const VkRenderPassCreateInfo2 *pCreateInfo,
    const VkAllocationCallbacks *pAllocator,
    VkRenderPass *pRenderPass) {

    if (!s_real_vkCreateRenderPass2) {
        s_real_vkCreateRenderPass2 = (PFN_vkCreateRenderPass2)get_real_vulkan_symbol("vkCreateRenderPass2");
    }

    VkRenderPassCreateInfo2 optimizedInfo;
    if (pCreateInfo) {
        optimizedInfo = *pCreateInfo;
        vortek_optimize_render_pass2(&optimizedInfo);
        pCreateInfo = &optimizedInfo;
    }

    if (s_real_vkCreateRenderPass2) {
        return s_real_vkCreateRenderPass2(device, pCreateInfo, pAllocator, pRenderPass);
    }
    return VK_ERROR_INITIALIZATION_FAILED;
}

/* Intercept vkCreateShaderModule to inject USC FP16 Dual-Issue optimizations */
VKAPI_ATTR VkResult VKAPI_CALL vkCreateShaderModule(
    VkDevice device,
    const VkShaderModuleCreateInfo *pCreateInfo,
    const VkAllocationCallbacks *pAllocator,
    VkShaderModule *pShaderModule) {

    if (!s_real_vkCreateShaderModule) {
        s_real_vkCreateShaderModule = (PFN_vkCreateShaderModule)get_real_vulkan_symbol("vkCreateShaderModule");
    }

    VkShaderModuleCreateInfo optimizedInfo;
    uint32_t *pNewCode = NULL;
    size_t newSize = 0;

    if (pCreateInfo && pCreateInfo->pCode) {
        optimizedInfo = *pCreateInfo;
        vortek_optimize_spirv_module(pCreateInfo->pCode, pCreateInfo->codeSize, &pNewCode, &newSize);
        optimizedInfo.pCode = pNewCode;
        optimizedInfo.codeSize = newSize;
        pCreateInfo = &optimizedInfo;
    }

    VkResult res = VK_ERROR_INITIALIZATION_FAILED;
    if (s_real_vkCreateShaderModule) {
        res = s_real_vkCreateShaderModule(device, pCreateInfo, pAllocator, pShaderModule);
    }

    if (pNewCode && pNewCode != pCreateInfo->pCode) {
        free(pNewCode);
    }

    return res;
}

/* Intercept vkAllocateMemory for 16KB kernel alignment */
VKAPI_ATTR VkResult VKAPI_CALL vkAllocateMemory(
    VkDevice device,
    const VkMemoryAllocateInfo *pAllocateInfo,
    const VkAllocationCallbacks *pAllocator,
    VkDeviceMemory *pMemory) {

    if (!s_real_vkAllocateMemory) {
        s_real_vkAllocateMemory = (PFN_vkAllocateMemory)get_real_vulkan_symbol("vkAllocateMemory");
    }

    VkMemoryAllocateInfo alignedInfo;
    if (pAllocateInfo) {
        alignedInfo = *pAllocateInfo;
        vortek_align_memory_allocation(&alignedInfo);
        pAllocateInfo = &alignedInfo;
    }

    if (s_real_vkAllocateMemory) {
        return s_real_vkAllocateMemory(device, pAllocateInfo, pAllocator, pMemory);
    }
    return VK_ERROR_INITIALIZATION_FAILED;
}
