window.__ModuleLoader__.load({
  id: '@joythatway/dsh-dafeiyu-evolution',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const {
      useCallback,
      useEffect,
      useRef,
      useState,
      useSyncExternalStore,
    } = React

    let createPortal = null
    try {
      const reactDom = require('react-dom')
      createPortal = reactDom?.createPortal ?? reactDom?.default?.createPortal ?? null
    } catch {
      createPortal = null
    }

    const NS = 'dafeiyu'
    const PLUGIN = '@joythatway/dsh-dafeiyu-evolution'

    const ZH = {
      'provider.account': 'DeepSeek 账号',
      'trigger.aria': '大肥鱼进化器：{stage}，思考强度 {effort}，模型 {model}。打开进化面板',
      'trigger.ariaPlain': '大肥鱼进化器：模型 {model}。打开进化面板',
      'trigger.pickAria': '大肥鱼进化器：还没有选鱼。打开进化面板',
      'trigger.loading': '鱼苗孵化中…',
      'trigger.pick': '选一条鱼',
      'trigger.missing': '鱼苗迷路了',
      'panel.title': '大肥鱼进化器',
      'panel.subtitle': '从露卡到深海大鲸，一条鱼决定把脑子长出来。',
      'panel.close': '收起',
      'panel.loading': '鱼苗孵化中…',
      'panel.error': '鱼苗没游过来：{message}',
      'panel.switchError': '没换成：{message}',
      'panel.retry': '再试一次',
      'panel.empty': '这个模型目录里还没有鱼。',
      'panel.noCatalog': '鱼种目录还没加载出来。',
      'panel.noReasoning': '这条鱼没有思考档位，只有一条直线。',
      'panel.single': '这条鱼只有一个档位：{effort}。',
      'panel.models': '鱼种（模型）',
      'panel.groupError': '{name} 的鱼群没游过来',
      'panel.hint': '选择会写回当前会话。',
      'panel.pickDesc': '还没有选鱼。挑一条，看看它进化到哪一步。',
      'rail.aria': '思考强度',
      'rail.hint': '点击或拖动',
      'rail.value': '{stage}，{effort}',
      'stage.0.name': '露卡（LUCA）',
      'stage.0.short': '露卡',
      'stage.0.desc': '现存所有生物的共同祖先，一个还没决定要不要长脑子的细胞。它先学会了复制自己，剩下的交给后代。',
      'stage.1.name': '海口鱼',
      'stage.1.short': '海口鱼',
      'stage.1.desc': '五亿年前的海口鱼，脊椎动物的全村希望。背上刚长出脊索，还没有下巴，但已经会拐弯了。',
      'stage.2.name': '提塔利克鱼',
      'stage.2.short': '提塔鱼',
      'stage.2.desc': '提塔利克鱼，鱼上岸前的最后一批试用装。鳍里长出了骨头，能撑着水底做俯卧撑；肺已经有了，差的是真正爬上岸的勇气。',
      'stage.3.name': '现在最通用的大肥鱼',
      'stage.3.short': '大肥鱼',
      'stage.3.desc': '深海本鲸，海里的显眼包。想得最深，游得最慢；你问它一句，它先在海里绕三圈，回来跟你说「我再想想」。',
    }

    const EN = {
      'provider.account': 'DeepSeek Account',
      'trigger.aria': 'Big fat fish evolution: {stage}, thinking level {effort}, model {model}. Open the evolution panel',
      'trigger.ariaPlain': 'Big fat fish evolution: model {model}. Open the evolution panel',
      'trigger.pickAria': 'Big fat fish evolution: no fish selected. Open the evolution panel',
      'trigger.loading': 'Hatching…',
      'trigger.pick': 'Pick a fish',
      'trigger.missing': 'The fish got lost',
      'panel.title': 'Big fat fish evolution',
      'panel.subtitle': 'From LUCA to a deep-sea whale: one fish decided to grow a brain.',
      'panel.close': 'Close',
      'panel.loading': 'Hatching…',
      'panel.error': 'The fish did not arrive: {message}',
      'panel.switchError': 'Could not switch: {message}',
      'panel.retry': 'Try again',
      'panel.empty': 'No fish in this model catalog yet.',
      'panel.noCatalog': 'The fish catalog has not loaded yet.',
      'panel.noReasoning': 'This fish has no thinking levels, just a straight line.',
      'panel.single': 'This fish has one level: {effort}.',
      'panel.models': 'Fish species (model)',
      'panel.groupError': 'The school for {name} did not arrive',
      'panel.hint': 'The choice is written back to this session.',
      'panel.pickDesc': 'No fish selected yet. Pick one and see how far it has evolved.',
      'rail.aria': 'Thinking level',
      'rail.hint': 'Click or drag',
      'rail.value': '{stage}, {effort}',
      'stage.0.name': 'LUCA',
      'stage.0.short': 'LUCA',
      'stage.0.desc': 'The common ancestor of all living things — a cell that had not decided whether to grow a brain yet. It learned to copy itself and left the rest to its descendants.',
      'stage.1.name': 'Haikouichthys',
      'stage.1.short': 'Haikou',
      'stage.1.desc': 'Haikouichthys, the village hope of vertebrates from 500 million years ago. A notochord just came online; still no jaw, but it can turn.',
      'stage.2.name': 'Tiktaalik',
      'stage.2.short': 'Tiktaalik',
      'stage.2.desc': 'Tiktaalik, the last beta build before fish went ashore. Bones grew inside its fins; it can do push-ups on the riverbed. It already has lungs — all it needs now is the courage to actually climb ashore.',
      'stage.3.name': "Today's big fat fish",
      'stage.3.short': 'Big fat fish',
      'stage.3.desc': "The deep sea's own whale, the ocean's main character. Thinks deepest, swims slowest — ask one thing and it circles the sea three times before saying “let me think again”.",
    }

    function textOf(t, key, params) {
      let text
      if (typeof t === 'function') {
        try {
          text = t(key, params)
        } catch {
          text = undefined
        }
      }
      if (typeof text !== 'string' || text === '' || text === key) text = ZH[key] ?? key
      if (params !== undefined && params !== null) {
        for (const name of Object.keys(params)) {
          text = text.replaceAll('{' + name + '}', String(params[name]))
        }
      }
      return text
    }

    const CANON = ['off', 'low', 'high', 'max']
    const ALIASES = {
      none: 0,
      disabled: 0,
      minimal: 1,
      low: 1,
      medium: 2,
      high: 2,
      xhigh: 3,
      highest: 3,
      ultra: 3,
      max: 3,
    }

    function visualFor(effortId, index, count) {
      const key = String(effortId ?? '').toLowerCase()
      const canonical = CANON.indexOf(key)
      if (canonical !== -1) return canonical
      if (ALIASES[key] !== undefined) return ALIASES[key]
      if (count <= 1) return 3
      return Math.max(0, Math.min(3, Math.round((index / (count - 1)) * 3)))
    }

    function stageCopyOf(t, visual) {
      return {
        name: textOf(t, 'stage.' + visual + '.name'),
        short: textOf(t, 'stage.' + visual + '.short'),
        desc: textOf(t, 'stage.' + visual + '.desc'),
      }
    }

    function findModel(groups, selection) {
      if (selection === null || selection === undefined) return null
      for (const group of groups ?? []) {
        if (group.id !== selection.provider) continue
        for (const model of group.models ?? []) {
          if (model.id === selection.model) return model
        }
      }
      return null
    }

    function providerLabel(group, t) {
      return group.id === 'deepseek-account' ? textOf(t, 'provider.account') : (group.name ?? group.id)
    }

    function effortIndexOf(efforts, effortId) {
      if (!Array.isArray(efforts) || efforts.length === 0) return -1
      if (effortId === undefined || effortId === null || effortId === '') return 0
      const index = efforts.findIndex((effort) => effort.id === effortId)
      return index === -1 ? 0 : index
    }

    function modelHasEffort(model, effortId) {
      if (effortId === undefined || effortId === null || effortId === '') return false
      return (model?.reasoning?.efforts ?? []).some((effort) => effort.id === effortId)
    }

    function effortTag(effortId) {
      const text = String(effortId ?? '').trim()
      return text === '' ? '' : text.toUpperCase()
    }

    const FISH = [

      `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="62" cy="62" r="27" fill="#6ED7C8" opacity="0.92"/>
        <circle cx="56" cy="58" r="15" fill="#2E9C93" opacity="0.5"/>
        <circle cx="52" cy="55" r="3.4" fill="#0F3B40"/>
        <circle cx="51" cy="54" r="1.1" fill="#E9FFFB"/>
        <path d="M88 58 q9 -5 14 0 q-5 6 -14 5" fill="#8CE6D8"/>
        <path d="M93 66 q10 3 13 11" stroke="#8CE6D8" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M39 45 q-8 -7 -5 -16" stroke="#8CE6D8" stroke-width="2.8" fill="none" stroke-linecap="round"/>
        <path d="M35 55 q-10 -3 -14 -10" stroke="#8CE6D8" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        <path d="M38 70 q-9 3 -14 9" stroke="#8CE6D8" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        <circle cx="24" cy="34" r="2" fill="#BDFFF4" opacity="0.55"/>
        <circle cx="97" cy="35" r="1.6" fill="#BDFFF4" opacity="0.5"/>
        <circle cx="88" cy="92" r="2.2" fill="#BDFFF4" opacity="0.4"/>
      </svg>`,

      `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M34 62 L12 46 L18 62 L12 78 Z" fill="#4C82E8"/>
        <ellipse cx="60" cy="61" rx="27" ry="16" fill="#6FA8FF"/>
        <path d="M52 47 q7 -12 19 -6 q-7 8 -19 6" fill="#8FBCFF"/>
        <path d="M55 55 q9 9 18 8 q-7 9 -16 5" fill="#A9CCFF" opacity="0.9"/>
        <path d="M41 68 q10 5 22 4" stroke="#C2DDFF" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>
        <circle cx="77" cy="57" r="4.6" fill="#F7FBFF"/>
        <circle cx="78.5" cy="57" r="2.5" fill="#12264A"/>
        <circle cx="79.3" cy="56.2" r="0.9" fill="#FFFFFF"/>
        <path d="M85 64 q4 1.5 6 0" stroke="#24447F" stroke-width="2" fill="none" stroke-linecap="round"/>
        <circle cx="34" cy="34" r="1.8" fill="#BFE0FF" opacity="0.6"/>
        <circle cx="42" cy="26" r="1.1" fill="#BFE0FF" opacity="0.5"/>
      </svg>`,

      `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M32 62 L8 42 L15 62 L8 82 Z" fill="#3E6FD8"/>
        <ellipse cx="59" cy="61" rx="32" ry="21" fill="#4F82EC"/>
        <path d="M49 43 q8 -13 23 -6 q-9 9 -23 6" fill="#7FA8FF"/>
        <path d="M53 68 q10 10 22 8 q-9 10 -20 5" fill="#9CC0FF" opacity="0.9"/>
        <path d="M39 72 q13 6 28 4" stroke="#C6DEFF" stroke-width="3.4" fill="none" stroke-linecap="round" opacity="0.65"/>
        <circle cx="79" cy="55" r="5.4" fill="#F7FBFF"/>
        <circle cx="81" cy="55" r="2.9" fill="#12264A"/>
        <circle cx="82" cy="54" r="1" fill="#FFFFFF"/>
        <path d="M88 64 q5 2 7 0" stroke="#24447F" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <circle cx="28" cy="30" r="2" fill="#BFE0FF" opacity="0.6"/>
        <circle cx="36" cy="22" r="1.2" fill="#BFE0FF" opacity="0.5"/>
      </svg>`,

      `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M30 64 C18 45 2 39 6 53 C9 59 16 61 22 62 C16 63 9 65 6 71 C2 85 18 81 30 64 Z" fill="#2D4CB8"/>
        <path d="M31 64 C33 43 54 33 76 35 C99 37 113 51 112 65 C111 81 95 93 73 93 C49 93 33 84 31 64 Z" fill="#3E63D8"/>
        <path d="M35 77 Q61 99 97 79 Q89 91 67 93 Q47 93 35 77 Z" fill="#C7DAFF" opacity="0.92"/>
        <path d="M57 37 q9 -9 17 -3 q-8 5 -17 3" fill="#6F94F2"/>
        <path d="M53 72 q12 8 23 2 q-9 13 -23 6 Z" fill="#7FA3F5"/>
        <path d="M80 36 q-3 -9 3 -15 M86 36 q3 -8 9 -10" stroke="#BFE0FF" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="94" cy="58" r="2.4" fill="#12264A"/>
        <circle cx="94.8" cy="57.2" r="0.8" fill="#FFFFFF"/>
        <path d="M104 67 q-12 7 -24 3" stroke="#24447F" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M81 85 q10 -2 16 -8 M77 89 q10 -2 16 -8" stroke="#A9C6F5" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.7"/>
        <circle cx="24" cy="26" r="2.2" fill="#BFE0FF" opacity="0.6"/>
        <circle cx="32" cy="18" r="1.3" fill="#BFE0FF" opacity="0.5"/>
        <circle cx="102" cy="88" r="1.5" fill="#BFE0FF" opacity="0.4"/>
      </svg>`,
    ]

    const ACCENTS = ['#6ED7C8', '#6FA8FF', '#4F82EC', '#4D6BFE']

    function Fish(props) {
      const visual = Math.max(0, Math.min(3, Number(props.visual) || 0))
      return h('span', {
        className: 'dfy-art ' + (props.className ?? ''),
        style: { '--dfy-accent': ACCENTS[visual] },
        'aria-hidden': 'true',
        dangerouslySetInnerHTML: { __html: FISH[visual] },
      })
    }

    function Bubble(props) {
      return h('span', {
        className: 'dfy-bubble',
        style: {
          left: props.left,
          width: props.size,
          height: props.size,
          animationDelay: props.delay,
          animationDuration: props.duration,
        },
        'aria-hidden': 'true',
      })
    }

    const CSS = `
      .dfy-trigger {
        display: flex;
        align-items: center;
        gap: 5px;
        min-width: 0;
        max-width: 360px;
        height: 28px;
        padding: 0 4px 0 4px;
        border: none;
        border-radius: var(--dsw-radius-sm, 8px);
        outline: none;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font-family: inherit;
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
        cursor: pointer;
      }
      @media (hover: hover) {
        .dfy-trigger:hover:not(:disabled) {
          background: var(--dsw-alias-interactive-bg-hover);
        }
      }
      .dfy-trigger:focus-visible {
        box-shadow: 0 0 0 2px var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
      }
      .dfy-trigger:disabled {
        color: var(--dsw-alias-label-dimmed);
        cursor: default;
      }
      .dfy-trigger-glyph {
        flex: 0 0 auto;
        display: grid;
        place-items: center;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: color-mix(in srgb, var(--dfy-accent, #4D6BFE) 14%, transparent);
      }
      .dfy-trigger-glyph .dfy-art {
        width: 21px;
        height: 21px;
      }
      .dfy-trigger-copy {
        display: flex;
        align-items: center;
        gap: 4px;
        min-width: 0;
        overflow: hidden;
        white-space: nowrap;
      }
      .dfy-trigger-stage,
      .dfy-trigger-effort,
      .dfy-trigger-model {
        display: var(--dsh-composer-model-text-display, block);
      }
      .dfy-trigger-stage {
        flex: 0 0 auto;
        font-size: 13px;
        line-height: 20px;
        color: var(--dsw-alias-label-secondary);
      }
      .dfy-trigger-effort {
        flex: 0 0 auto;
        padding: 0 4px;
        border-radius: 4px;
        background: color-mix(in srgb, var(--dfy-accent, #4D6BFE) 18%, transparent);
        color: var(--dsw-alias-label-primary);
        font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Menlo, monospace);
        font-size: 9.5px;
        font-weight: 600;
        letter-spacing: 0.08em;
        line-height: 14px;
      }
      .dfy-trigger-model {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--dsw-alias-label-caption);
        font-size: 11px;
        line-height: 20px;
      }
      .dfy-trigger-chevron {
        flex: 0 0 auto;
        display: var(--dsh-composer-model-text-display, block);
        width: 12px;
        height: 12px;
        opacity: 0.7;
      }
      .dfy-trigger-spinner {
        flex: 0 0 auto;
        width: 12px;
        height: 12px;
        border: 1.5px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: dfy-spin 0.8s linear infinite;
      }
      .dfy-trigger-broken {
        width: 28px;
        justify-content: center;
        padding: 0;
        opacity: 0.7;
      }
      .dfy-art {
        display: block;
        width: 100%;
        height: 100%;
      }
      .dfy-art svg {
        display: block;
        width: 100%;
        height: 100%;
      }

      .dfy-panel {
        position: fixed;
        z-index: 2147483400;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, 0.22));
        border-radius: var(--dsw-radius-lg, 16px);
        background: var(--dsw-alias-bg-layer-2, #ffffff);
        box-shadow: var(--dsw-elevation-prominent, 0 18px 52px rgba(0, 0, 0, 0.28));
        color: var(--dsw-alias-label-primary, #111111);
        font-family: inherit;
        animation: dfy-in 0.16s ease-out;
      }
      @keyframes dfy-in {
        from { opacity: 0; transform: translateY(6px) scale(0.99); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .dfy-head {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 12px 14px 10px;
      }
      .dfy-head-copy {
        min-width: 0;
        flex: 1 1 auto;
      }
      .dfy-title {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
      }
      .dfy-subtitle {
        margin-top: 1px;
        font-size: 11px;
        line-height: 16px;
        color: var(--dsw-alias-label-secondary);
      }
      .dfy-close {
        flex: 0 0 auto;
        display: grid;
        place-items: center;
        width: 24px;
        height: 24px;
        margin: -2px -2px 0 0;
        padding: 0;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        cursor: pointer;
      }
      .dfy-close:hover {
        background: var(--dsw-alias-interactive-bg-hover);
      }
      .dfy-close:focus-visible {
        outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
        outline-offset: 1px;
      }
      .dfy-body {
        flex: 1 1 auto;
        min-height: 0;
        padding: 0 14px 14px;
        overflow-y: auto;
        overscroll-behavior: contain;
      }
      .dfy-hero {
        position: relative;
        height: 158px;
        border-radius: 12px;
        overflow: hidden;
        background:
          radial-gradient(120% 80% at 50% 0%, rgba(120, 180, 255, 0.32), transparent 62%),
          linear-gradient(180deg, #0c1d3d 0%, #0d2a55 58%, #071328 100%);
      }
      .dfy-hero-glow {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -32%;
        height: 72%;
        background: radial-gradient(52% 62% at 50% 100%, rgba(111, 168, 255, 0.4), transparent 72%);
        pointer-events: none;
      }
      .dfy-hero-art {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 116px;
        height: 116px;
        transform: translate(-50%, -53%);
        animation: dfy-bob 4.4s ease-in-out infinite;
      }
      .dfy-hero-art svg {
        filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.32));
      }
      .dfy-hero-caption {
        position: absolute;
        left: 12px;
        right: 12px;
        bottom: 10px;
        display: flex;
        align-items: center;
        gap: 6px;
        min-width: 0;
      }
      .dfy-hero-name {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #ffffff;
        font-size: 13px;
        font-weight: 600;
        line-height: 18px;
        text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
      }
      .dfy-tag {
        flex: 0 0 auto;
        padding: 1px 5px;
        border: 1px solid rgba(191, 224, 255, 0.45);
        border-radius: 4px;
        color: #dcebff;
        font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Menlo, monospace);
        font-size: 8.5px;
        font-weight: 600;
        letter-spacing: 0.1em;
        line-height: 13px;
      }
      .dfy-hero-spinner {
        flex: 0 0 auto;
        width: 12px;
        height: 12px;
        border: 1.5px solid rgba(220, 235, 255, 0.85);
        border-right-color: transparent;
        border-radius: 50%;
        animation: dfy-spin 0.8s linear infinite;
      }
      .dfy-bubble {
        position: absolute;
        bottom: -12px;
        border: 1px solid rgba(191, 224, 255, 0.62);
        border-radius: 50%;
        opacity: 0;
        animation-name: dfy-rise;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        pointer-events: none;
      }
      @keyframes dfy-rise {
        0% { transform: translateY(0) scale(0.6); opacity: 0; }
        14% { opacity: 0.75; }
        100% { transform: translateY(-182px) scale(1); opacity: 0; }
      }
      @keyframes dfy-bob {
        0%, 100% { transform: translate(-50%, -53%); }
        50% { transform: translate(-50%, -57%); }
      }
      @keyframes dfy-spin {
        to { transform: rotate(360deg); }
      }
      .dfy-desc {
        min-height: 17px;
        margin: 9px 2px 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 11.5px;
        line-height: 17px;
      }
      .dfy-state {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 2px;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 18px;
      }
      .dfy-spinner {
        width: 14px;
        height: 14px;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: dfy-spin 0.8s linear infinite;
      }
      .dfy-note {
        margin-top: 10px;
        padding: 9px 10px;
        border: 1px dashed var(--dsw-alias-border-l1);
        border-radius: 8px;
        color: var(--dsw-alias-label-secondary);
        font-size: 11.5px;
        line-height: 17px;
      }
      .dfy-rail-head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 8px;
        margin: 12px 2px 2px;
      }
      .dfy-rail-label {
        color: var(--dsw-alias-label-secondary);
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.12em;
        line-height: 14px;
      }
      .dfy-rail-hint {
        color: var(--dsw-alias-label-caption);
        font-size: 10px;
        line-height: 14px;
        white-space: nowrap;
      }
      .dfy-rail {
        position: relative;
        margin: 2px 0 2px;
        padding: 0 0 2px;
      }
      .dfy-stops {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: flex-start;
      }
      .dfy-stop {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        min-width: 0;
        padding: 0;
        border: none;
        border-radius: 10px;
        background: transparent;
        color: inherit;
        font-family: inherit;
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;
      }
      .dfy-stop:hover .dfy-stop-art {
        filter: saturate(0.9);
      }
      .dfy-stop[data-active="true"]:hover .dfy-stop-art {
        filter: none;
      }
      .dfy-stop:focus-visible {
        outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
        outline-offset: 2px;
      }
      .dfy-stop-art {
        display: block;
        width: 42px;
        height: 42px;
        filter: saturate(0.72) opacity(0.86) drop-shadow(0 1px 1px rgba(10, 20, 40, 0.3));
        transition: transform 0.15s ease, filter 0.15s ease;
      }
      .dfy-stop[data-active="true"] .dfy-stop-art {
        filter: none;
        transform: translateY(-2px);
      }
      .dfy-stop-dot {
        display: block;
        width: 10px;
        height: 10px;
        border: 2px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.42));
        border-radius: 50%;
        background: var(--dsw-alias-bg-layer-2, #ffffff);
        box-sizing: border-box;
        transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
      }
      .dfy-stop[data-active="true"] .dfy-stop-dot {
        border-color: var(--dfy-accent, #4d6bfe);
        background: var(--dfy-accent, #4d6bfe);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--dfy-accent, #4d6bfe) 24%, transparent);
      }
      .dfy-stop-label {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--dsw-alias-label-secondary);
        font-size: 11px;
        line-height: 15px;
      }
      .dfy-stop[data-active="true"] .dfy-stop-label {
        color: var(--dsw-alias-label-primary);
        font-weight: 600;
      }
      .dfy-stop-tag {
        color: var(--dsw-alias-label-secondary);
        opacity: 0.9;
        font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Menlo, monospace);
        font-size: 9.5px;
        letter-spacing: 0.08em;
        line-height: 13px;
      }
      .dfy-stop[data-active="true"] .dfy-stop-tag {
        color: var(--dfy-accent, #4d6bfe);
        opacity: 1;
        font-weight: 600;
      }
      .dfy-track {
        position: absolute;
        z-index: 0;
        top: 49px;
        height: 2px;
        border-radius: 2px;
        background: var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.32));
        pointer-events: none;
      }
      .dfy-track-fill {
        height: 100%;
        border-radius: 2px;
        background: linear-gradient(90deg, #6ed7c8, #4d6bfe);
        transition: width 0.15s ease;
      }
      .dfy-range {
        position: absolute;
        z-index: 2;
        top: 0;
        height: 58px;
        margin: 0;
        padding: 0;
        opacity: 0;
        cursor: ew-resize;
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
      }
      .dfy-range:focus {
        outline: none;
      }
      .dfy-range::-webkit-slider-thumb {
        width: 1px;
        height: 1px;
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
      }
      .dfy-range::-moz-range-thumb {
        width: 1px;
        height: 1px;
        border: none;
        background: transparent;
      }
      .dfy-section {
        margin-top: 14px;
        padding-top: 12px;
        border-top: 1px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, 0.22));
      }
      .dfy-section-head {
        display: flex;
        align-items: baseline;
        gap: 6px;
        margin-bottom: 6px;
      }
      .dfy-section-label {
        color: var(--dsw-alias-label-secondary);
        font-size: 10.5px;
        font-weight: 600;
        letter-spacing: 0.1em;
        line-height: 14px;
      }
      .dfy-group + .dfy-group {
        margin-top: 8px;
      }
      .dfy-group-name {
        margin-bottom: 4px;
        color: var(--dsw-alias-label-caption);
        font-size: 10px;
        line-height: 14px;
      }
      .dfy-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        max-height: 108px;
        padding: 1px;
        overflow-y: auto;
      }
      .dfy-chip {
        max-width: 100%;
        height: 26px;
        padding: 0 9px;
        overflow: hidden;
        border: 1px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, 0.26));
        border-radius: 999px;
        background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-secondary);
        font-family: inherit;
        font-size: 11.5px;
        line-height: 24px;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
      .dfy-chip:hover {
        background: var(--dsw-alias-interactive-bg-hover);
      }
      .dfy-chip:focus-visible {
        outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
        outline-offset: 1px;
      }
      .dfy-chip[data-selected="true"] {
        border-color: var(--dsw-alias-brand-primary, #4d6bfe);
        background: color-mix(in srgb, var(--dsw-alias-brand-primary, #4d6bfe) 16%, transparent);
        color: var(--dsw-alias-label-primary);
        font-weight: 600;
      }
      .dfy-chip-check {
        margin-right: 4px;
        color: var(--dsw-alias-brand-primary, #4d6bfe);
        font-weight: 700;
      }
      .dfy-chip[data-pending="true"] {
        opacity: 0.65;
      }
      .dfy-warning {
        margin-top: 5px;
        color: var(--dsw-alias-state-warn-label, #9a6b00);
        font-size: 10px;
        line-height: 14px;
      }
      .dfy-error {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin-top: 10px;
        padding: 8px 10px;
        border-radius: 8px;
        background: rgba(224, 72, 72, 0.1);
        color: var(--dsw-alias-state-error-primary, #c43c3c);
        font-size: 11.5px;
        line-height: 16px;
      }
      .dfy-error-text {
        min-width: 0;
        flex: 1 1 auto;
        word-break: break-word;
      }
      .dfy-retry {
        flex: 0 0 auto;
        padding: 0 2px;
        border: none;
        background: transparent;
        color: inherit;
        font-family: inherit;
        font-size: 11.5px;
        font-weight: 600;
        line-height: 16px;
        text-decoration: underline;
        cursor: pointer;
      }
      .dfy-hint {
        margin: 10px 0 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 10.5px;
        line-height: 16px;
      }
      @media (max-width: 480px) {
        .dfy-panel { border-radius: 12px; }
        .dfy-hero { height: 142px; }
        .dfy-hero-art { width: 102px; height: 102px; }
        .dfy-stop-label { font-size: 10px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .dfy-bubble, .dfy-hero-art, .dfy-panel { animation: none; }
        .dfy-track-fill, .dfy-stop { transition: none; }
      }
    `

    function Chevron() {
      return h('svg', {
        className: 'dfy-trigger-chevron',
        viewBox: '0 0 12 12',
        fill: 'none',
        'aria-hidden': 'true',
      }, h('path', {
        d: 'M2.5 4.75 L6 8.25 L9.5 4.75',
        stroke: 'currentColor',
        strokeWidth: '1.4',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }))
    }

    function CloseGlyph() {
      return h('svg', {
        width: 12,
        height: 12,
        viewBox: '0 0 12 12',
        fill: 'none',
        'aria-hidden': 'true',
      }, h('path', {
        d: 'M2.5 2.5 L9.5 9.5 M9.5 2.5 L2.5 9.5',
        stroke: 'currentColor',
        strokeWidth: '1.4',
        strokeLinecap: 'round',
      }))
    }

    function Bubbles() {
      return h(React.Fragment, null,
        h(Bubble, { left: '18%', size: 5, delay: '0s', duration: '7.5s' }),
        h(Bubble, { left: '27%', size: 3, delay: '1.8s', duration: '8.5s' }),
        h(Bubble, { left: '67%', size: 4, delay: '0.9s', duration: '7s' }),
        h(Bubble, { left: '76%', size: 6, delay: '3.1s', duration: '9s' }),
        h(Bubble, { left: '86%', size: 3, delay: '2.2s', duration: '8s' }),
      )
    }

    const EMPTY_SNAPSHOT = Object.freeze({
      current: null,
      routable: null,
      groups: [],
      failures: [],
      status: 'idle',
      pending: null,
      error: null,
    })

    const EMPTY_STORE = Object.freeze({
      getSnapshot: () => EMPTY_SNAPSHOT,
      subscribe: () => () => {},
    })

    function EvolutionSeat(props) {
      const { locked, available, directory, load, select, t } = props
      const T = (key, params) => textOf(t, key, params)

      const [open, setOpen] = useState(false)
      const [anchor, setAnchor] = useState(null)
      const [preview, setPreview] = useState(null)
      const [requestError, setRequestError] = useState(null)

      const triggerRef = useRef(null)
      const panelRef = useRef(null)
      const commitTimerRef = useRef(0)
      const stopRefs = useRef([])

      const subscribe = useCallback((fn) => directory.subscribe(fn), [directory])
      const getSnapshot = useCallback(() => directory.getSnapshot(), [directory])
      const state = useSyncExternalStore(subscribe, getSnapshot)

      const current = state.current
      const currentModel = findModel(state.groups, current)
      const efforts = currentModel?.reasoning?.efforts ?? []
      const currentEffortId = current?.reasoningEffort
        ?? currentModel?.reasoning?.defaultEffort
        ?? efforts[0]?.id
      const committedIndex = effortIndexOf(efforts, currentEffortId)
      const effectiveIndex = preview !== null && preview >= 0 && preview < efforts.length
        ? preview
        : committedIndex

      const stages = efforts.map((effort, index) => {
        const visual = visualFor(effort.id, index, efforts.length)
        return {
          id: effort.id,
          effortName: effort.name ?? effort.id,
          tag: effortTag(effort.id),
          visual,
          ...stageCopyOf(T, visual),
        }
      })

      const fallbackVisual = visualFor(currentEffortId, 0, 1)
      const fallbackStage = {
        id: currentEffortId,
        effortName: currentEffortId,
        tag: effortTag(currentEffortId),
        visual: fallbackVisual,
        ...stageCopyOf(T, fallbackVisual),
      }
      const heroStage = stages[effectiveIndex] ?? (current === null ? null : fallbackStage)
      const busy = state.status === 'selecting'

      useEffect(() => {
        load()
      }, [load])

      useEffect(() => {
        setPreview(null)
      }, [current?.provider, current?.model, current?.reasoningEffort])

      useEffect(() => {
        if (!open) {
          setAnchor(null)
          return undefined
        }
        const update = () => {
          const rect = triggerRef.current?.getBoundingClientRect()
          if (rect === undefined || rect === null) return
          const width = Math.min(420, window.innerWidth - 24)
          const right = Math.max(12, Math.min(window.innerWidth - width - 12, window.innerWidth - rect.right))
          const above = rect.top - 16
          const below = window.innerHeight - rect.bottom - 16
          const placeBelow = above < 340 && below > above
          const maxHeight = Math.max(200, Math.min(560, placeBelow ? below : above))
          setAnchor(placeBelow
            ? { width, right, top: rect.bottom + 10, maxHeight }
            : { width, right, bottom: window.innerHeight - rect.top + 12, maxHeight })
        }
        update()
        window.addEventListener('resize', update)
        document.addEventListener('scroll', update, true)
        return () => {
          window.removeEventListener('resize', update)
          document.removeEventListener('scroll', update, true)
        }
      }, [open])

      useEffect(() => {
        if (!open) return undefined
        const onPointerDown = (event) => {
          if (panelRef.current?.contains(event.target) === true) return
          if (triggerRef.current?.contains(event.target) === true) return
          setOpen(false)
        }
        const onKeyDown = (event) => {
          if (event.key === 'Escape') {
            setOpen(false)
            triggerRef.current?.focus()
          }
        }
        document.addEventListener('pointerdown', onPointerDown, true)
        document.addEventListener('keydown', onKeyDown, true)
        return () => {
          document.removeEventListener('pointerdown', onPointerDown, true)
          document.removeEventListener('keydown', onKeyDown, true)
        }
      }, [open])

      useEffect(() => () => {
        window.clearTimeout(commitTimerRef.current)
      }, [])

      if (!available) return null

      const modelName = currentModel?.name ?? current?.model ?? ''

      const stageForTrigger = heroStage ?? fallbackStage
      const triggerAria = current === null
        ? T('trigger.pickAria')
        : stageForTrigger.tag === ''
          ? T('trigger.ariaPlain', { model: modelName })
          : T('trigger.aria', { stage: stageForTrigger.name, effort: stageForTrigger.tag, model: modelName })
      const triggerTitle = current === null
        ? T('trigger.pickAria')
        : `${stageForTrigger.name} · ${stageForTrigger.tag === '' ? T('panel.noReasoning') : T('rail.aria') + ' ' + stageForTrigger.tag} · ${modelName}`
      const loadingWithoutSelection = current === null
        && (state.status === 'loading' || state.status === 'idle')

      const runSelect = async (selection) => {
        try {
          const result = await select(selection)
          if (result === undefined) return T('panel.noCatalog')
          if (result.ok === false) return result.error?.message ?? 'unknown error'
          return null
        } catch (error) {
          return String(error?.message ?? error)
        }
      }

      const commitStage = async (index) => {
        const stage = stages[index]
        if (stage === undefined || current === null) return
        if (stage.id === currentEffortId) {
          setPreview(null)
          return
        }
        setRequestError(null)
        const failure = await runSelect({
          provider: current.provider,
          model: current.model,
          reasoningEffort: stage.id,
        })
        if (failure !== null) {
          setPreview(null)
          setRequestError(T('panel.switchError', { message: failure }))
        }
      }

      const scheduleStage = (index) => {
        setPreview(index)
        window.clearTimeout(commitTimerRef.current)
        commitTimerRef.current = window.setTimeout(() => {
          commitStage(index)
        }, 320)
      }

      const commitModel = async (group, model) => {
        window.clearTimeout(commitTimerRef.current)
        setPreview(null)
        const keepEffort = current === null ? false : modelHasEffort(model, currentEffortId)
        const nextEffort = keepEffort
          ? currentEffortId
          : model.reasoning?.defaultEffort
        if (current !== null && group.id === current.provider && model.id === current.model) return
        setRequestError(null)
        const failure = await runSelect({
          provider: group.id,
          model: model.id,
          ...nextEffort === undefined ? {} : { reasoningEffort: nextEffort },
        })
        if (failure !== null) {
          setRequestError(T('panel.switchError', { message: failure }))
        }
      }

      const retry = () => {
        window.clearTimeout(commitTimerRef.current)
        setPreview(null)
        setRequestError(null)
        load()
      }

      const close = () => {
        setOpen(false)
        triggerRef.current?.focus()
      }

      const toggle = () => {
        if (locked) return
        if (open) {
          setOpen(false)
          return
        }
        setRequestError(null)
        load()
        setOpen(true)
      }

      const heroVisual = heroStage?.visual ?? 3
      const heroName = heroStage?.name ?? T('trigger.pick')
      const heroDesc = heroStage?.desc ?? T('panel.pickDesc')
      const showLoading = loadingWithoutSelection
      const selectionError = requestError
        ?? (state.status === 'error' && state.error !== null
          ? T('panel.error', { message: state.error })
          : null)

      const panel = h('div', {
        ref: panelRef,
        className: 'dfy-panel',
        role: 'dialog',
        'aria-label': T('panel.title'),
        style: anchor === null ? { display: 'none' } : {
          width: anchor.width,
          right: anchor.right,
          ...anchor.top === undefined ? { bottom: anchor.bottom } : { top: anchor.top },
          maxHeight: anchor.maxHeight,
        },
      },
        h('div', { className: 'dfy-head' },
          h('div', { className: 'dfy-head-copy' },
            h('h2', { className: 'dfy-title' }, T('panel.title')),
            h('div', { className: 'dfy-subtitle' }, T('panel.subtitle')),
          ),
          h('button', {
            type: 'button',
            className: 'dfy-close',
            onClick: close,
            'aria-label': T('panel.close'),
            title: T('panel.close'),
          }, h(CloseGlyph)),
        ),
        h('div', { className: 'dfy-body' },
          h('div', { className: 'dfy-hero' },
            h('div', { className: 'dfy-hero-glow' }),
            h(Bubbles),
            h(Fish, { visual: heroVisual, className: 'dfy-hero-art' }),
            h('div', { className: 'dfy-hero-caption' },
              h('span', { className: 'dfy-hero-name' }, heroName),
              heroStage?.tag ? h('span', { className: 'dfy-tag' }, heroStage.tag) : null,
              busy ? h('span', { className: 'dfy-hero-spinner', 'aria-hidden': 'true' }) : null,
            ),
          ),
          h('p', { className: 'dfy-desc' }, heroDesc),

          showLoading
            ? h('div', { className: 'dfy-state', role: 'status' },
              h('span', { className: 'dfy-spinner', 'aria-hidden': 'true' }),
              h('span', null, T('panel.loading')),
            )
            : null,

          stages.length > 1
            ? h(React.Fragment, null,
              h('div', { className: 'dfy-rail-head' },
                h('span', { className: 'dfy-rail-label' }, T('rail.aria')),
                h('span', { className: 'dfy-rail-hint' }, T('rail.hint')),
              ),
              h('div', { className: 'dfy-rail' },
              h('div', {
                className: 'dfy-stops',
                role: 'radiogroup',
                'aria-label': T('rail.aria'),
                onKeyDown: (event) => {
                  const delta = event.key === 'ArrowRight' || event.key === 'ArrowDown'
                    ? 1
                    : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
                      ? -1
                      : 0
                  const next = event.key === 'Home'
                    ? 0
                    : event.key === 'End'
                      ? stages.length - 1
                      : delta === 0
                        ? effectiveIndex
                        : Math.max(0, Math.min(stages.length - 1, effectiveIndex + delta))
                  if (next === effectiveIndex && delta === 0 && event.key !== 'Home' && event.key !== 'End') return
                  event.preventDefault()
                  commitStage(next)
                  window.requestAnimationFrame(() => {
                    stopRefs.current[next]?.focus()
                  })
                },
              },
                stages.map((stage, index) => h('button', {
                  key: stage.id,
                  type: 'button',
                  role: 'radio',
                  'aria-checked': index === effectiveIndex ? 'true' : 'false',
                  tabIndex: index === effectiveIndex ? 0 : -1,
                  className: 'dfy-stop',
                  'data-active': index === effectiveIndex ? 'true' : 'false',
                  title: stage.name,
                  style: {
                    width: `${100 / stages.length}%`,
                    '--dfy-accent': ACCENTS[stage.visual],
                  },
                  ref: (node) => { stopRefs.current[index] = node },
                  autoFocus: index === effectiveIndex,
                  onClick: () => commitStage(index),
                },
                  h(Fish, { visual: stage.visual, className: 'dfy-stop-art' }),
                  h('span', { className: 'dfy-stop-dot', 'aria-hidden': 'true' }),
                  h('span', { className: 'dfy-stop-label' }, stage.short),
                  h('span', { className: 'dfy-stop-tag' }, stage.tag),
                )),
              ),
              h('div', {
                className: 'dfy-track',
                style: {
                  left: `${50 / stages.length}%`,
                  right: `${50 / stages.length}%`,
                },
              },
                h('div', {
                  className: 'dfy-track-fill',
                  style: {
                    width: stages.length <= 1
                      ? '0%'
                      : `${(effectiveIndex / (stages.length - 1)) * 100}%`,
                  },
                }),
              ),
              h('input', {
                className: 'dfy-range',
                type: 'range',
                tabIndex: -1,
                'aria-hidden': 'true',
                min: 0,
                max: Math.max(0, stages.length - 1),
                step: 1,
                value: Math.max(0, effectiveIndex),
                style: {
                  left: `${50 / stages.length}%`,
                  width: `${100 - 100 / stages.length}%`,
                },
                onChange: (event) => {
                  const next = Number(event.target.value)
                  if (Number.isFinite(next)) scheduleStage(next)
                },
              }),
              ),
            )
            : null,

          stages.length === 1
            ? h('div', { className: 'dfy-note' },
              T('panel.single', { effort: stages[0].tag }))
            : null,

          stages.length === 0 && current !== null
            ? h('div', { className: 'dfy-note' }, T('panel.noReasoning'))
            : null,

          h('div', { className: 'dfy-section' },
            h('div', { className: 'dfy-section-head' },
              h('span', { className: 'dfy-section-label' }, T('panel.models')),
            ),
            state.groups.length === 0
              ? h('div', { className: 'dfy-note' }, T('panel.noCatalog'))
              : state.groups.map((group) => h('div', { className: 'dfy-group', key: group.id },
                state.groups.length > 1
                  ? h('div', { className: 'dfy-group-name' }, providerLabel(group, t))
                  : null,
                h('div', { className: 'dfy-chips' },
                  group.models.map((model) => {
                    const selected = current !== null
                      && current.provider === group.id
                      && current.model === model.id
                    const pending = state.pending !== null
                      && state.pending !== undefined
                      && state.pending.provider === group.id
                      && state.pending.model === model.id
                    return h('button', {
                      key: group.id + '/' + model.id,
                      type: 'button',
                      className: 'dfy-chip',
                      'data-selected': selected ? 'true' : 'false',
                      'data-pending': pending ? 'true' : 'false',
                      'aria-pressed': selected ? 'true' : 'false',
                      title: providerLabel(group, t) + ' · ' + model.name,
                      onClick: () => commitModel(group, model),
                    },
                      selected ? h('span', { className: 'dfy-chip-check', 'aria-hidden': 'true' }, '✓') : null,
                      model.name ?? model.id,
                    )
                  }),
                ),
              )),
            (state.failures ?? []).map((failure) => h('div', {
              key: 'failure/' + failure.id,
              className: 'dfy-warning',
            }, T('panel.groupError', { name: failure.id === 'deepseek-account' ? T('provider.account') : failure.name }))),
          ),

          selectionError !== null
            ? h('div', { className: 'dfy-error', role: 'alert' },
              h('span', { className: 'dfy-error-text' }, selectionError),
              h('button', { type: 'button', className: 'dfy-retry', onClick: retry }, T('panel.retry')),
            )
            : null,

          h('p', { className: 'dfy-hint' }, T('panel.hint')),
        ),
      )

      const triggerLabel = current === null
        ? (loadingWithoutSelection ? T('trigger.loading') : T('trigger.pick'))
        : (stageForTrigger.short ?? stageForTrigger.name)

      return h(React.Fragment, null,
        h('button', {
          ref: triggerRef,
          type: 'button',
          className: 'dfy-trigger',
          disabled: locked,
          'aria-haspopup': 'dialog',
          'aria-expanded': open ? 'true' : 'false',
          'aria-label': triggerAria,
          title: triggerTitle,
          onClick: toggle,
          style: { '--dfy-accent': ACCENTS[stageForTrigger.visual] },
        },
          h('span', { className: 'dfy-trigger-glyph' },
            h(Fish, { visual: stageForTrigger.visual }),
          ),
          h('span', { className: 'dfy-trigger-copy' },
            h('span', { className: 'dfy-trigger-stage' }, triggerLabel),
            stageForTrigger.tag !== ''
              ? h('span', { className: 'dfy-trigger-effort' }, stageForTrigger.tag)
              : null,
            modelName !== ''
              ? h('span', { className: 'dfy-trigger-model' }, modelName)
              : null,
          ),
          busy
            ? h('span', { className: 'dfy-trigger-spinner', 'aria-hidden': 'true' })
            : h(Chevron),
        ),
        open && anchor !== null && typeof document !== 'undefined'
          ? (createPortal === null ? panel : createPortal(panel, document.body))
          : null,
      )
    }

    class SeatBoundary extends React.Component {
      constructor(props) {
        super(props)
        this.state = { failed: false }
      }

      static getDerivedStateFromError() {
        return { failed: true }
      }

      componentDidCatch(error, info) {
        try {
          console.error('[dafeiyu-evolution] seat render failed', error, info)
        } catch {

        }
      }

      render() {
        if (this.state.failed) {
          return h('span', {
            className: 'dfy-trigger dfy-trigger-broken',
            title: '大肥鱼进化器渲染失败',
            'aria-hidden': 'true',
          }, h('span', { className: 'dfy-trigger-glyph' }, h(Fish, { visual: 3 })))
        }
        return this.props.children
      }
    }

    function BoundarySeat(props) {
      return h(SeatBoundary, null, h(EvolutionSeat, props))
    }

    function createSeatInject(ctx) {
      return (sessionId) => {
        let available = false
        try {
          available = ctx.sessions.subagentAddress(sessionId) === undefined
        } catch {
          available = false
        }

        let resolved = null
        const resolve = () => {
          if (resolved === null) resolved = ctx.modelDirectories.directoryFor(sessionId)
          return resolved
        }
        const safe = (operation, fallback) => {
          try {
            return operation(resolve())
          } catch (error) {
            try {
              console.error('[dafeiyu-evolution] model directory unavailable', error)
            } catch {

            }
            return fallback
          }
        }
        const failed = (message) => Promise.resolve({
          ok: false,
          error: { code: 'dafeiyu/local', message },
        })

        return {
          available,
          get directory() {
            return safe((directory) => directory.store, EMPTY_STORE)
          },
          load: () => {
            if (!available) return
            safe((directory) => {
              directory.load().catch(() => {})
            }, undefined)
          },
          select: (selection) => {
            if (!available) return Promise.resolve(undefined)
            const result = safe((directory) => directory.select(selection), null)
            if (result === null) return failed('模型目录不可用')
            return Promise.resolve(result).then(
              (value) => value ?? { ok: true, value: undefined },
              (error) => ({
                ok: false,
                error: { code: 'dafeiyu/local', message: String(error?.message ?? error) },
              }),
            )
          },
        }
      }
    }

    function apply(ctx) {
      ctx.effect(() => {
        const tag = document.createElement('style')
        tag.dataset.plugin = PLUGIN
        tag.textContent = CSS
        document.head.appendChild(tag)
        return () => tag.remove()
      }, 'dafeiyu-evolution: styles')

      ctx.effect(() => {
        try {
          return ctx.locale.register(NS, { zh: ZH, en: EN })
        } catch {
          return undefined
        }
      }, 'dafeiyu-evolution: dictionaries')

      ctx.slots.inject('conversation.input.model', () => ctx.slots.register({
        name: 'conversation.input.model',
        priority: -10,
        locale: NS,
        inject: createSeatInject(ctx),
      }, BoundarySeat))
    }

    return {

      inject: ['slots', 'sessions', 'modelDirectories', 'remote', 'remote.session', 'locale'],
      apply,
    }
  },
})
