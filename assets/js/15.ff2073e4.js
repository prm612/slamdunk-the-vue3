(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{334:function(e,n,a){"use strict";a.r(n);var t=a(33),r=Object(t.a)({},(function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("p",[e._v("ref 其实就是 reactive 包了一层，读取值要要通过 ref.value 进行读取，同时进行 track ，而设置值的时候，也会先判断相对于旧值是否有变化，有变化才进行设置，以及 trigger。话不多说，下面就进行 ref 的分析。")]),e._v(" "),a("p",[e._v("通过 createRef 创建 ref，如果传入的 rawValue 本身就是一个 ref 的话，直接返回。")]),e._v(" "),a("p",[e._v("而如果 shallow 为 false， 直接让 ref.value 等于 value，否则对 rawValue 进行 convert 转化成 reactive。可以看到 __v_isRef 标识 一个对象是否是 ref，读取 value 触发 track，设置 value 而且 newVal 的 toRaw 跟 原先的 rawValue 不一致，则进行设置，同样对于非 shallow 也进行 convert。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("export function ref(value?: unknown) {\n  return createRef(value)\n}\nconst convert = <T extends unknown>(val: T): T =>\n  isObject(val) ? reactive(val) : val\nfunction createRef(rawValue: unknown, shallow = false) {\n  if (isRef(rawValue)) {\n    return rawValue\n  }\n  let value = shallow ? rawValue : convert(rawValue)\n  const r = {\n    __v_isRef: true,\n    get value() {\n      track(r, TrackOpTypes.GET, 'value')\n      return value\n    },\n    set value(newVal) {\n      if (hasChanged(toRaw(newVal), rawValue)) {\n        rawValue = newVal\n        value = shallow ? newVal : convert(newVal)\n        trigger(\n          r,\n          TriggerOpTypes.SET,\n          'value',\n          __DEV__ ? { newValue: newVal } : void 0\n        )\n      }\n    }\n  }\n  return r\n}\n")])])]),a("p",[e._v("triggerRef 手动触发 trigger ，对 shallowRef 可以由调用者手动触发。 unref 则是反向操作，取出 ref 中的 value 值。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("export function triggerRef(ref: Ref) {\n  trigger(\n    ref,\n    TriggerOpTypes.SET,\n    'value',\n    __DEV__ ? { newValue: ref.value } : void 0\n  )\n}\n\nexport function unref<T>(ref: T): T extends Ref<infer V> ? V : T {\n  return isRef(ref) ? (ref.value as any) : ref\n}\n\n")])])]),a("p",[e._v("toRefs 是将一个 reactive 对象或者 readonly 转化成 一个个 refs 对象，这个可以从 toRef 方法可以看出。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("export function toRefs<T extends object>(object: T): ToRefs<T> {\n  if (__DEV__ && !isProxy(object)) {\n    console.warn(`toRefs() expects a reactive object but received a plain one.`)\n  }\n  const ret: any = {}\n  for (const key in object) {\n    ret[key] = toRef(object, key)\n  }\n  return ret\n}\n\nexport function toRef<T extends object, K extends keyof T>(\n  object: T,\n  key: K\n): Ref<T[K]> {\n  return {\n    __v_isRef: true,\n    get value(): any {\n      return object[key]\n    },\n    set value(newVal) {\n      object[key] = newVal\n    }\n  } as any\n}\n\n")])])]),a("p",[e._v("需要提到 baseHandlers 一点的是，对于非 shallow 模式中，对于 target 不是数组，会直接拿 ref.value 的值，而不是 ref。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v(" if (isRef(res)) {\n      if (targetIsArray) {\n        !isReadonly && track(target, TrackOpTypes.GET, key)\n        return res\n      } else {\n        // ref unwrapping, only for Objects, not for Arrays.\n        return res.value\n      }\n    }\n\n")])])]),a("p",[e._v("而 set 中，如果对于 target 是对象，oldValue 是 ref， value 不是 ref，直接把 vlaue 设置给 oldValue.value")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("if (!shallow) {\n      value = toRaw(value)\n      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {\n        oldValue.value = value\n        return true\n      }\n}\n")])])]),a("p",[e._v("需要注意的是， ref 还支持自定义 ref，就是又调用者手动去触发 track 或者 trigger，就是通过工厂模式生成我们的 ref 的 get 和 set")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("export type CustomRefFactory<T> = (\n  track: () => void,\n  trigger: () => void\n) => {\n  get: () => T\n  set: (value: T) => void\n}\n\nexport function customRef<T>(factory: CustomRefFactory<T>): Ref<T> {\n  const { get, set } = factory(\n    () => track(r, TrackOpTypes.GET, 'value'),\n    () => trigger(r, TriggerOpTypes.SET, 'value')\n  )\n  const r = {\n    __v_isRef: true,\n    get value() {\n      return get()\n    },\n    set value(v) {\n      set(v)\n    }\n  }\n  return r as any\n}\n")])])]),a("p",[e._v("这个用法，我们可以在测试用例找到，")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v(" const custom = customRef((track, trigger) => ({\n  get() {\n    track()\n    return value\n  },\n  set(newValue: number) {\n    value = newValue\n    _trigger = trigger\n  }\n}))\n")])])])])}),[],!1,null,null,null);n.default=r.exports}}]);