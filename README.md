# 大肥鱼进化器 · Big fat fish evolution

把输入框里的「模型 + 思考强度」控件，换成一条会进化的鲸。

npm: [`@joythatway/dsh-dafeiyu-evolution`](https://www.npmjs.com/package/@joythatway/dsh-dafeiyu-evolution) · GitHub: [`joythatway/dsh-dafeiyu-evolution`](https://github.com/joythatway/dsh-dafeiyu-evolution)

| 档位 | 阶段 | 介绍 |
| --- | --- | --- |
| `off` | 露卡（LUCA） | 现存所有生物的共同祖先，一个还没决定要不要长脑子的细胞。它先学会了复制自己，剩下的交给后代。 |
| `low` | 海口鱼 | 五亿年前的海口鱼，脊椎动物的全村希望。背上刚长出脊索，还没有下巴，但已经会拐弯了。 |
| `high` | 提塔利克鱼 | 鱼上岸前的最后一批试用装。鳍里长出了骨头，能撑着水底做俯卧撑；肺已经有了，差的是真正爬上岸的勇气。 |
| `max` | 现在最通用的大肥鱼 | 深海本鲸，海里的显眼包。想得最深，游得最慢；你问它一句，它先在海里绕三圈，回来跟你说「我再想想」。 |

## 怎么用

- 输入框工具行原来的模型控件会变成一条鲸形胶囊：鲸 + 阶段 + 档位 + 模型名。
- 点它打开进化面板：上面是当前这条鲸，中间是「思考强度」进化轨，下面是「鱼种（模型）」列表。
- 点档位或拖动进化轨上的圆点切换思考强度；停手后写回当前会话。
- 点鱼种切换模型。
- 收起：点面板外、按 `Esc`、点右上角 `×`。

所有鱼、鲸、图标和预览图都是为本插件原创绘制的 SVG，没有使用第三方图片素材。

## 限制

- 只影响输入框的模型与思考强度控件，不碰会话内容、工具或其它插件。
- 有子代理地址的会话不显示这个控件，和官方行为一致。
- 如果某个模型没有提供思考档位，面板只保留鱼种切换，并说明这条鲸没有思考档位。
- 选择只影响之后的请求；正在跑的那一步仍用它开始时拿到的模型与档位。
- 选择失败会在面板里显示原因，可以点「再试一次」重新拉取目录。

## 安装

在 DSH 里打开 **插件 → 添加插件**，输入 npm 包名：

```sh
dsh plugin --profile <profile> add @joythatway/dsh-dafeiyu-evolution
```

也可以直接选本地目录，或从 GitHub Release 的 tarball 安装。装完刷新页面。它是纯前端插件，Host 半边是空的，不需要构建步骤。

## English

Replaces the composer's model and thinking-level control with one evolving whale. `off` is LUCA, `low` is Haikouichthys, `high` is Tiktaalik, and `max` is the deep sea's own whale. Click the capsule, tap a level or drag the rail dot, and pick another species (model) when needed. Selections are written back to the current session; the `/model` command stays available. All fish, whale, icon and preview artwork is original SVG drawn for this plugin; no third-party images are used.

No build step. Install the npm package or the directory as a local bundle and refresh the page.
