---
title: CMake 查找外部依赖
---

# 介绍

CMake 提供了许多方法来将外部依赖合并到构建中，项目和用户可以灵活地选择最适合他们需求的方法。

> [!TIP]
>
> 详细说明参考[官网](https://cmake.org/cmake/help/latest/guide/using-dependencies/index.html#guide:Using%20Dependencies%20Guide)。

## 使用 `find_package()` 命令

```
find_package(<PackageName> [version] [EXACT] [QUIET] [MODULE]
             [REQUIRED] [[COMPONENTS] [components...]]
             [OPTIONAL_COMPONENTS components...]
             [REGISTRY_VIEW  (64|32|64_32|32_64|HOST|TARGET|BOTH)]
             [GLOBAL]
             [NO_POLICY_SCOPE]
             [BYPASS_PROVIDER])
```

基本签名支持 Config 模式和 Module 模式，`MODULE` 关键字表示仅使用 Module 模式来查找包，而不能退回到 Config 模式。无论使用哪种模式，都会设置一个 `<PackageName>_FOUND` 变量来指示是否找到了包。如果给定了 `[version]` 参数，Config 模式将仅会查找与声明的版本兼容的包。

`find_package()` 命令提供了两种搜索模式来查找依赖：

### Config 模式

在 Config 模式下，`find_package()` 命令查找由包本身提供的**配置文件**，配置文件通常可以在名称与模式 `lib/cmake/<PackageName>` 匹配的目录中找到（详情查看[配置模式搜索过程](https://cmake.org/cmake/help/latest/command/find_package.html#search-procedure)）。通常 `<PackageName>` 是 `find_package()` 命令的第一个参数，甚至可能是唯一的参数，也可以使用 `NAMES` 选项指定替代名称：

```
find_package(SomeThing
  NAMES
    SameThingOtherName   # Another name for the package
    SomeThing            # Also still look for its canonical name
)
```

配置文件的名称必须是 `<PackageName>Config.cmake` 或者 `<LowercasePackageName>-config.cmake`，在同一个目录下也可能会存在名为 `<PackageName>ConfigVersion.cmake` 或者 `<LowercasePackageName>-config-version.cmake` 的可选文件。CMake 使用此文件来确定包的版本是否满足 `find_package()` 调用中包含的任何版本约束。

`CMAKE_PREFIX_PATH` 变量可以在调用 CMake 时设置，它被视为要在其中搜索配置文件的基本路径的列表。例如，安装在 `/opt/somepackage` 中的软件包通常会安装配置文件`/opt/somepackage/lib/cmake/somePackage/SomePackageConfig.cmake`，在这种情况下，应该将 `/opt/somepackage` 添加到 `CMAKE_PREFIX_PATH` 中。

> [!TIP]
>
> `CMAKE_PREFIX_PATH` 变量也是一个列表，但它需要使用特定于平台的环境变量列表项分隔符（Unix 上为 `:`，Windows 上为 `;`）。

### Module 模式

并不是所有的包都支持 CMake，许多依赖没有提供支持配置模式所需的文件，在这种模式下，CMake 将搜索 `Find<SomePackage>.cmake` 文件，CMake 搜索由 `CMAKE_MODULE_PATH` 变量指定的路径来定位查找模块文件。查找模块文件通常不由包本身提供。

## 使用 FetchContent 从源码构建

依赖不一定要预先构建才能在 CMake 中使用，也可以从源码构建作为主项目的一部分。FetchContent 模块提供了下载内容的功能，如果依赖项也使用 CMake，则可以将其添加到主项目。对 `find_package()` 的调用可以在内部重定向到 FetchContent 模块提供的包。对于调用者来说，除了搜索逻辑被绕过并且组件信息不被使用之外，行为看起来与 Config 模式类似。



这允许FetchContent_MakeAvailable（）尝试首先通过调用find_package（）来满足依赖关系，使用FIND_PACKAGE_ARGS关键字后面的参数（如果有的话）。如果没有找到依赖项，则按照前面描述的方式从源代码构建依赖项。





```
include(FetchContent)
FetchContent_Declare(
  googletest
  GIT_REPOSITORY https://github.com/google/googletest.git
  GIT_TAG        703bd9caab50b139428cea1aaff9974ebee5742e # release-1.10.0
)
FetchContent_Declare(
  Catch2
  GIT_REPOSITORY https://github.com/catchorg/Catch2.git
  GIT_TAG        605a34765aa5d5ecbf476b4598a862ada971b0cc # v3.0.1
)

FetchContent_MakeAvailable(googletest Catch2)
```

FetchContent 和 find_package() 集成



```cmake []
include(FetchContent)
FetchContent_Declare(
  googletest
  GIT_REPOSITORY https://github.com/google/googletest.git
  GIT_TAG        703bd9caab50b139428cea1aaff9974ebee5742e # release-1.10.0
  FIND_PACKAGE_ARGS NAMES GTest
)

FetchContent_MakeAvailable(googletest)
add_executable(ThingUnitTest thing_ut.cpp)
target_link_libraries(ThingUnitTest GTest::gtest_main)
```





配置文件和查找模块文件都可以定义导入目标，这些名称通常采用 `SomePrefix::ThingName` 的形式。如果这些变量可用，项目应该优先使用它们，而不是包提供的 CMake 变量。例如：

```cmake
cmake_minimum_required(VERSION 3.10)
project(MyExeProject VERSION 1.0.0)

# Make project-provided Find modules available
list(APPEND CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/cmake")

find_package(SomePackage REQUIRED)
add_executable(MyExe main.cpp)
target_link_libraries(MyExe PRIVATE SomePrefix::LibName)
```



## 使用 FindPkgConfig





