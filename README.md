# HtmlColorScheme

这是一个独立的原生 HTML 现代颜色与布局样式框架，当前实现来自
`Silmoon.Templates` 中的 `ModernColorDemo.cshtml` 相关布局提取。

目标是让其他项目可以直接复制 HTML 结构、CSS 和 JS 后快速套用，也方便后续在这里独立迭代，再按需同步回模板项目。

## 文件结构

```text
HtmlColorScheme/
├─ index.html
├─ colorDemo.html
├─ css/
│  ├─ modern-color-layout.css
│  └─ style.css
├─ js/
│  ├─ modern-color-layout.js
│  └─ script.js
└─ tools/
   └─ static-server.js
```

主模板核心文件只有三个：

- `index.html`：现代颜色布局主入口，包含完整布局和控件状态示例。
- `css/modern-color-layout.css`：主题变量、布局、Bootstrap 常用控件适配。
- `js/modern-color-layout.js`：亮色、暗色、自动主题切换、移动端菜单交互和返回顶部按钮。

`colorDemo.html`、`css/style.css` 和 `js/script.js` 是旧的轻量颜色切换示例，保留用于对照，不是这套现代布局的主要入口。

## 依赖

Demo 默认使用 CDN：

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

如果你的项目已经本地集成 Bootstrap 和 Bootstrap Icons，把 `index.html` 中的 CDN 地址替换成项目内路径即可。

`modern-color-layout.js` 本身只使用标准浏览器 API。Bootstrap JS 仅用于 Bootstrap 自带的标签页、下拉菜单等交互组件。

## 快速预览

```powershell
node tools/static-server.js
```

然后打开：

```text
http://127.0.0.1:4173/index.html
```

服务器根路径也会直接打开主模板：

```text
http://127.0.0.1:4173/
```

如果系统 `PATH` 里没有 `node`，可以用 Codex 工作区运行时或自己的 Node.js 运行同一个文件。

## 最小接入

页面头部引入：

```html
<link href="bootstrap.min.css" rel="stylesheet">
<link href="bootstrap-icons.css" rel="stylesheet">
<link href="css/modern-color-layout.css" rel="stylesheet">
```

页面底部引入：

```html
<script src="bootstrap.bundle.min.js"></script>
<script src="js/modern-color-layout.js"></script>
```

基础布局：

```html
<div id="content">
    <div class="theme-toggle-group">
        <button class="theme-btn" data-theme="light" title="亮色模式" type="button"><i class="bi bi-sun"></i></button>
        <button class="theme-btn" data-theme="dark" title="暗色模式" type="button"><i class="bi bi-moon"></i></button>
        <button class="theme-btn" data-theme="auto" title="自动模式" type="button"><i class="bi bi-circle-half"></i></button>
    </div>

    <button id="toggle-menu" class="btn btn-primary" type="button" aria-label="打开菜单">
        <i class="bi bi-list"></i>
    </button>

    <div class="content-wrapper">
        <nav id="menu" aria-label="主菜单">
            <div class="menu-header">
                <h3>实例页面</h3>
                <div class="text-secondary">现代色彩功能布局</div>
            </div>
            <a href="#overview" class="menu-item active"><i class="bi bi-house-door"></i>布局概览</a>
            <div class="menu-group">
                <button class="menu-item menu-submenu-toggle" type="button">
                    <span><i class="bi bi-ui-checks"></i>控件示例</span>
                    <i class="bi bi-chevron-down menu-submenu-arrow"></i>
                </button>
                <div class="menu-submenu">
                    <a href="#forms" class="menu-item"><i class="bi bi-input-cursor"></i>表单控件</a>
                    <a href="#buttons" class="menu-item"><i class="bi bi-ui-checks-grid"></i>按钮控件</a>
                </div>
            </div>
        </nav>

        <main class="content-main">
            <header id="overview" class="content-header">
                <h1>现代色彩功能布局</h1>
                <p class="text-secondary mt-2">Simple Modern Layout System</p>
            </header>
            <section class="pb-3">
                <div class="card p-3">
                    <div class="mb-3 b text-gradient">内容标题</div>
                    <p class="text-secondary">这里放业务内容。</p>
                </div>
            </section>
        </main>
    </div>
</div>
```

移动端菜单内也可以放一组 `.theme-menu-btn`，脚本会自动同步状态。

脚本会在移动端把 `#menu` 临时移动到 `document.body` 下，以确保菜单在页面滚动后仍然固定显示在菜单按钮下方；切回桌面断点时会自动恢复到 `.content-wrapper` 中。

## 子菜单

菜单支持原生 HTML 子菜单结构，静态页、Razor Pages 和 Blazor 都使用同一套类名：

- `.menu-group`：一个可展开菜单组。
- `.menu-submenu-toggle`：展开按钮，必须同时带 `.menu-item`。
- `.menu-submenu`：子菜单容器。
- `.menu-submenu-arrow`：右侧箭头图标。

示例：

```html
<div class="menu-group">
    <button class="menu-item menu-submenu-toggle" type="button">
        <span><i class="bi bi-folder"></i>系统管理</span>
        <i class="bi bi-chevron-down menu-submenu-arrow"></i>
    </button>
    <div class="menu-submenu">
        <a href="/users" class="menu-item"><i class="bi bi-people"></i>用户管理</a>
        <a href="/roles" class="menu-item"><i class="bi bi-shield"></i>角色管理</a>
    </div>
</div>
```

脚本会自动补齐 `aria-controls`，维护 `aria-expanded`，并在子项带 `.active` 或 `aria-current="page"` 时自动展开父级子菜单。Blazor 中可直接把子项写成 `NavLink class="menu-item"`。

## 主题模式

主题按钮通过 `data-theme` 控制：

- `data-theme="light"`：强制亮色。
- `data-theme="dark"`：强制暗色。
- `data-theme="auto"`：跟随系统偏好。

脚本会把用户选择保存到 `localStorage`：

```text
modern-color-layout-theme
```

暗色模式通过根元素属性实现：

```html
<html data-theme="dark">
```

亮色模式通过：

```html
<html data-theme="light">
```

自动模式在系统为暗色时会设置 `data-theme="dark"`；系统为亮色时移除 `data-theme`，使用默认亮色变量。

## CSS 变量

主要变量集中在 `:root` 和 `:root[data-theme="dark"]`：

```css
:root {
    --primary-color: #0d6efd;
    --menu-width: 220px;
    --mobile-menu-top: 78px;
    --mobile-edge-offset: 20px;
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --bg-tertiary: rgba(255, 255, 255, 0.95);
    --text-primary: #212529;
    --text-secondary: #586575;
    --border-color: rgba(0, 0, 0, 0.1);
    --card-bg: rgba(255, 255, 255, 0.98);
    --interactive-bg: #ffffff;
    --choice-bg: #ffffff;
    --control-color-scheme: light;
    --native-indicator-filter: none;
    --focus-ring-color: rgba(13, 110, 253, 0.24);
    --active-bg: linear-gradient(135deg, var(--primary-color), #0056b3);
}
```

常用变量含义：

- `--primary-color`：主色，影响按钮、菜单激活态、标签页底线、选择控件选中态。
- `--menu-width`：桌面侧边菜单宽度。
- `--mobile-menu-top` / `--mobile-edge-offset`：移动端弹出菜单和菜单按钮的固定位置。
- `--bg-primary` / `--bg-secondary` / `--bg-tertiary`：页面、次级区域和主容器背景。
- `--text-primary` / `--text-secondary`：正文和辅助文字。
- `--border-color` / `--border-light`：普通边框和玻璃容器边框。
- `--card-bg`：卡片背景。
- `--interactive-*`：输入框、下拉框、文件上传等交互控件状态。
- `--choice-*`：checkbox、radio、switch 的未选、悬停、禁用状态。
- `--control-color-scheme`：通知浏览器原生表单控件使用亮色或暗色绘制。
- `--native-indicator-filter`：日期、时间、月份等原生选择器图标的明暗滤镜。
- `--focus-ring-color`：焦点光晕。
- `--panel-bg` / `--panel-bg-hover`：列表、标签页内容、弹出层等面板背景。
- `--active-bg`：主激活渐变背景。

修改主题时优先改变量，不要直接散落修改组件颜色。

## 已适配控件

当前样式覆盖了这些 Bootstrap 或原生 HTML 控件状态：

- 文本输入、邮箱输入、多行文本。
- 只读、禁用、成功校验、错误校验。
- 下拉框、日期、时间、文件上传。
- checkbox、radio、switch。
- range 滑块、color 选择。
- input-group。
- primary、outline、secondary、success、warning、danger、info、link 按钮。
- 按钮组、禁用按钮、激活按钮。
- nav-tabs，包括激活、悬停、焦点、禁用。
- dropdown，包括激活、悬停、禁用。
- list-group、pagination、progress、badge。
- alert、table、card、modal、popover 基础颜色。

`index.html` 中保留了这些状态示例，建议每次改 CSS 后用它做回归检查。

## 实用类

- `.text-gradient`：主色渐变文字。
- `.glass-effect`：玻璃背景效果。
- `.control-panel`：用于把一组控件放进统一面板。
- `.control-row`：横向按钮或徽章排列，自动换行。
- `.back-to-top`：脚本自动创建的返回顶部按钮，滚动超过一屏后显示。

## 开发约定

1. 颜色优先走 CSS 变量。
2. 通用 Bootstrap 组件适配放在文件底部的 hardening 区域。
3. checkbox、radio、switch 不要和 `.form-control` 共用焦点背景规则，它们有独立的 `--choice-*` 变量。
4. 标签页激活态保持底部线条，不使用外框式 active。
5. 禁用态应清晰可读，但不能保留高亮阴影。
6. 新增控件时，同时在亮色、暗色、自动模式下检查默认、焦点、禁用、激活状态。
7. `modern-color-layout.css` 和 `modern-color-layout.js` 是跨项目统一文件，同步回 ASP.NET 项目和模板项目时应保持内容一致。

## 回归检查清单

每次修改后建议检查：

- 亮色、暗色、自动模式切换按钮状态是否同步。
- 暗色卡片内文字是否仍为亮色。
- checkbox、radio、switch：
  - unchecked + 非焦点
  - checked + 非焦点
  - checked + 焦点
  - disabled
- 输入框：
  - 默认
  - hover
  - focus
  - readonly
  - disabled
  - valid / invalid
- 日期和时间控件：
  - 暗色模式下图标可见
  - 禁用状态下图标弱化
- 按钮：
  - primary
  - outline
  - active
  - disabled
- 标签页 active 是否仍为底部线条。
- 移动端菜单：
  - 滚动页面后点击菜单按钮，菜单仍固定在按钮下方。
  - 菜单和按钮之间保留适当间距。
  - 首个菜单项可见，菜单内容不被滚动到上方。
  - 子菜单能展开、收起，active 子项所在父菜单会自动展开。
  - 页面无横向滚动。
- 返回顶部按钮：
  - 滚动超过一屏后显示。
  - 点击后平滑回到页面顶部。

## 与模板项目的来源关系

最初提取来源：

```text
D:\Git\GitHub\silmoonsone\Silmoon.Templates\Silmoon.Templates\content\Silmoon.AspNetCore.FullFunctionTemplate
```

源文件映射：

- `Pages\Shared\_BlankLayout.cshtml` -> HTML head 依赖和空白页面壳。
- `Pages\Shared\_ModernColorLayout.cshtml` -> `#content`、主题按钮、菜单按钮、`.content-wrapper`。
- `Pages\Shared\_ModernColorLayoutDemo.cshtml` -> 左侧菜单和 `.content-main`。
- `Pages\ModernColorDemo.cshtml` -> 示例内容。
- `wwwroot\css\modern-color-layout.css` -> `css\modern-color-layout.css`。
- `wwwroot\js\modern-color-layout.js` -> `js\modern-color-layout.js`，已改为独立原生 JavaScript。

后续如果要同步回模板项目，建议先在本项目完成视觉和状态回归，再按 CSS/JS/HTML 结构分别合并。
