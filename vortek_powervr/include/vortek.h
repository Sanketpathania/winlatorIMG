#ifndef VORTEK_POWERVR_H
#define VORTEK_POWERVR_H

#include <stdint.h>
#include <stdbool.h>
#include <vulkan/vulkan.h>

#ifdef __cplusplus
extern "C" {
#endif

/* PowerVR DXT Vendor & Architecture Identification */
#define VENDOR_ID_IMAGINATION          0x1010
#define POWERVR_DXT48_DEVICE_ID        0x9000
#define POWERVR_PAGE_SIZE_16K          16384

typedef struct {
    bool is_powervr_dxt;
    bool enable_tbdr_discard;
    bool enable_xfb_emulation;
    bool enable_usc_fast_math;
    bool enable_16k_page_align;
    uint32_t device_id;
    char device_name[256];
} VortekPowerVRConfig;

/* Global configuration instance */
extern VortekPowerVRConfig g_vortek_cfg;

/* Core Initialization & Interception */
void vortek_init_hardware_detection(VkPhysicalDevice physicalDevice);
void vortek_optimize_render_pass(VkRenderPassCreateInfo *pCreateInfo);
void vortek_optimize_render_pass2(VkRenderPassCreateInfo2 *pCreateInfo);
void vortek_optimize_spirv_module(const uint32_t *pCode, size_t codeSize, uint32_t **ppOutCode, size_t *pOutSize);
void vortek_align_memory_allocation(VkMemoryAllocateInfo *pAllocateInfo);

/* Transform Feedback (XFB) Emulation stubs for DXVK / D3D11 */
VkResult vortek_emulate_xfb_draw(VkCommandBuffer commandBuffer, uint32_t vertexCount, uint32_t instanceCount);

#ifdef __cplusplus
}
#endif

#endif /* VORTEK_POWERVR_H */
