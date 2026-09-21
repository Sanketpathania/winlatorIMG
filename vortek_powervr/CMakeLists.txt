cmake_minimum_required(VERSION 3.18.1)

project(vortek_powervr C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -O3 -fPIC -Wl,-z,max-page-size=16384")

include_directories(include)

add_library(vortek_powervr SHARED
    src/vortek_core.c
    src/vortek_interceptor.c
)

target_link_libraries(vortek_powervr
    log
    dl
)
