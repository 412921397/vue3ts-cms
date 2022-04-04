import * as echarts from "echarts";
import chinaMapData from "../data/china.json";

/** 注册中国地图 */
echarts.registerMap("china", chinaMapData);

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el);
  /** 传入相应的地图options配置 */
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options);
  };
  /*** 更新窗口变化 */
  const updateSize = () => {
    echartInstance.resize();
  };
  /** 监听浏览器的窗口变化 */
  window.addEventListener("resize", () => {
    echartInstance.resize();
  });

  return {
    echartInstance,
    setOptions,
    updateSize
  };
}
