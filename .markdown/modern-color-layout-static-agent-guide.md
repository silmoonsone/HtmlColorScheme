# HtmlColorScheme 静态模板使用说明（Agent）

本文给 Codex 或其他 AI Agent 使用，说明如何维护和使用当前目录中的现代颜色布局静态模板。

本项目是纯静态 HTML 模板项目。本文只描述当前目录中的文件职责、模板结构、修改边界和回归检查方法。

## 1. 项目定位

`HtmlColorScheme` 是现代颜色布局的静态模板源，用来独立开发、预览和验证颜色、布局、菜单、控件状态与响应式行为。

主要目标：

- 作为静态页面模板直接运行和预览。
- 作为可复制的静态样式、脚本和 HTML 结构参考源。
- 集中验证亮色、暗色、自动模式下的控件状态。
- 验证桌面端、移动端、滚动场景和子菜单交互。

## 2. 文件职责

当前项目的核心文件：

- `index.html`：主模板页面，展示现代颜色布局、菜单、控件、子菜单、表格和状态组件。
- `colorDemo.html`：颜色切换或颜色方案的辅助示例页，属于次要 demo。
- `css/modern-color-layout.css`：现代颜色布局的核心样式，包含主题变量、页面布局、菜单、控件状态、表格、响应式和移动端菜单样式。
- `js/modern-color-layout.js`：现代颜色布局的核心脚本，包含主题切换、移动端菜单定位、菜单激活、子菜单展开、重复初始化保护。
- `css/style.css`：当前静态 demo 自己的页面样式。不要把只能服务 demo 的样式混入核心样式。
- `js/script.js`：当前静态 demo 自己的脚本。不要把只能服务 demo 的行为混入核心脚本。
- `tools/static-server.js`：本地静态开发服务器脚本。
- `README.md`：给普通使用者看的项目说明。
- `.markdown/modern-color-layout-static-agent-guide.md`：给 AI Agent 看的维护和使用说明，也就是本文。

## 3. 修改边界

核心样式和脚本只放通用能力：

- 颜色变量和主题切换。
- 页面骨架布局。
- 主菜单、子菜单和移动端菜单。
- 表单控件、按钮、标签页、表格、分页、提示框等基础控件状态。
- 亮色、暗色、自动模式下的可读性和焦点状态。

不要把以下内容写入核心样式或核心脚本：

- 某个业务项目的接口调用。
- 登录、注册、退出登录。
- 权限判断和用户状态。
- 某个系统专属品牌文案。
- 只服务 demo 展示的临时效果。

这类内容应放在页面 HTML、`css/style.css` 或 `js/script.js` 中。

## 4. 依赖和运行

模板页面使用 Bootstrap 5、Bootstrap Icons 和标准浏览器 API。

本地预览优先使用项目自带静态服务器：

```powershell
node tools/static-server.js
```

如果当前环境没有全局 `node`，可以使用可用的 Node.js 运行时启动同一个脚本。

启动后重点预览：

- `index.html`
- `colorDemo.html`

不要只用文件双击方式验证移动端菜单和锚点行为；本地服务器更接近实际使用场景。

## 5. 页面结构约定

主模板页面必须保留这些关键结构：

```html
<div id="content">
    <div class="theme-toggle-group">
        <button class="theme-btn" data-theme="light" type="button"></button>
        <button class="theme-btn" data-theme="dark" type="button"></button>
        <button class="theme-btn" data-theme="auto" type="button"></button>
    </div>
    <button id="toggle-menu" type="button"></button>
    <div class="content-wrapper">
        <nav id="menu" aria-label="主菜单">
            <div class="menu-header"></div>
            <a href="#overview" class="menu-item active"></a>
        </nav>
        <main class="content-main"></main>
    </div>
</div>
```

除非同时修改 `css/modern-color-layout.css` 和 `js/modern-color-layout.js`，不要重命名：

- `#content`
- `.theme-toggle-group`
- `.theme-btn`
- `#toggle-menu`
- `.content-wrapper`
- `#menu`
- `.menu-item`
- `.content-main`

## 6. 菜单和锚点

`index.html` 以锚点导航为主：

```html
<a href="#forms" class="menu-item">
    <i class="bi bi-input-cursor"></i>表单控件
</a>
```

脚本会根据当前 hash 激活菜单项。添加新 section 时，要同时补充：

- 内容区元素的 `id`。
- 左侧菜单项的 `href`。
- 必要时补充示例控件和状态。

跨页面链接也可以使用 `.menu-item`，但当前页的激活状态需要由页面 HTML 明确输出 `active` 或 `aria-current="page"`。

## 7. 子菜单

子菜单使用统一结构：

```html
<div class="menu-group">
    <button class="menu-item menu-submenu-toggle" type="button">
        <span><i class="bi bi-folder"></i>系统管理</span>
        <i class="bi bi-chevron-down menu-submenu-arrow"></i>
    </button>
    <div class="menu-submenu">
        <a href="#users" class="menu-item"><i class="bi bi-people"></i>用户管理</a>
        <a href="#roles" class="menu-item"><i class="bi bi-shield"></i>角色管理</a>
    </div>
</div>
```

只标记子项 `active` 或 `aria-current="page"`。脚本会负责父级展开、`aria-expanded`、`.menu-submenu.open` 和 `.child-active`。

不要在 `script.js` 中再写一套子菜单展开逻辑。

## 8. 主题

主题按钮通过 `data-theme` 区分：

- `light`：亮色。
- `dark`：暗色。
- `auto`：跟随系统。

主题值保存在 `localStorage` 的 `modern-color-layout-theme`。页面中可以同时存在桌面浮动主题按钮和菜单内主题按钮，核心脚本会联动它们的状态。

修改主题变量时，要同时检查：

- 页面背景。
- 卡片和表格背景。
- 主文本、次级文本、禁用文本。
- 输入框、选择框、日期和时间控件。
- checkbox、radio、switch、range、file、color。
- hover、active、focus、disabled、readonly、valid、invalid。

## 9. 移动端菜单

移动端打开菜单时，核心脚本会把 `#menu` 移动到 `document.body`，并固定显示在 `#toggle-menu` 下方。回到桌面宽度后，脚本会把菜单移回 `.content-wrapper`。

因此不要写依赖 `#menu.parentElement` 永远等于 `.content-wrapper` 的代码。

移动端菜单与按钮之间的间距由 CSS 变量控制：

```css
:root {
    --mobile-menu-gap: 10px;
}
```

修改移动端菜单时必须验证：

- 页面顶部打开菜单。
- 页面滚动后打开菜单。
- 锚点跳转后打开菜单。
- 关闭菜单后再滚动。
- 窗口从移动端宽度切回桌面宽度。

## 10. 控件覆盖

`index.html` 应持续覆盖常见 HTML 控件和状态，作为回归测试页面。

至少包含：

- 文本输入、邮箱输入、搜索框、多行文本。
- select、date、time、file、range、color。
- checkbox、radio、switch。
- readonly、disabled、valid、invalid、focus。
- button、outline button、disabled button、dropdown。
- tabs、alert、badge、progress、pagination、table。

新增样式时，要优先复用已有变量和通用类。避免为了单个示例新增一次性颜色或一次性布局。

## 11. 代码整理原则

修改前先判断代码属于哪一层：

- 通用布局和控件能力：放入 `modern-color-layout.css` 或 `modern-color-layout.js`。
- 当前 demo 的展示行为：放入 `style.css` 或 `script.js`。
- 页面示例内容：放入 HTML。

清理冗余时优先做：

- 合并重复 CSS 变量。
- 删除已经没有 DOM 使用的选择器。
- 删除只服务旧结构的 JS 分支。
- 将重复控件样式提取为通用选择器。
- 保持图标按钮、菜单按钮和表单控件尺寸稳定。

不要为了“看起来统一”删除必要的状态差异，例如 disabled、readonly、focus、invalid 应该有明确视觉区别。

## 12. 回归检查

提交前至少检查：

- `index.html` 在亮色、暗色、自动模式下可读。
- 所有主题按钮状态正确联动。
- 菜单项点击后能激活。
- hash 导航能激活对应菜单项。
- 子菜单子项激活时父级自动展开。
- 移动端滚动后菜单仍显示在菜单按钮下方。
- `button.menu-item` 不显示成浏览器原生白色按钮。
- 表单控件的正常、焦点、禁用、只读、校验状态都可读。
- 日期和时间控件在暗色模式下图标可见。
- 文档和代码保持 UTF-8 BOM 与 CRLF。
