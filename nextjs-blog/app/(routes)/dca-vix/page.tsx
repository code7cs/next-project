"use client";

import React, {  useEffect, useRef, useState } from "react";
import styles from "./dca-vix.module.css";

const defaultEtfPrices = {
  VOO: 420.5,
  QQQ: 380.25,
  SCHD: 78.9,
  VYM: 110.45,
  XLU: 68.3,
  JNJ: 162.8,
  BIL: 91.25,
};

type InputsState = {
  totalBudget: string;
  baseDCA: string;
  flexibleFund: string;
  cashReserve: string;
  currentSPY: string;
  threeMonthHigh: string;
  vixLevel: string;
  fearGreed: string;
  vooRatio: string;
  qqqRatio: string;
  defensiveRatio: string;
};

const defaultInputs: InputsState = {
  totalBudget: "3000",
  baseDCA: "1500",
  flexibleFund: "1000",
  cashReserve: "500",
  currentSPY: "450",
  threeMonthHigh: "480",
  vixLevel: "20",
  fearGreed: "50", // 新增 Fear & Greed Index
  vooRatio: "70",
  qqqRatio: "25",
  defensiveRatio: "5",
};

function getDropPercentage(threeMonthHigh: number, currentSPY: number) {
  return ((threeMonthHigh - currentSPY) / threeMonthHigh) * 100;
}

function getDipAmount(dropPercentage: number, flexibleFund: number) {
  if (dropPercentage >= 15) return flexibleFund;
  if (dropPercentage >= 10) return flexibleFund;
  if (dropPercentage >= 5) return flexibleFund * 0.5;
  return 0;
}

function getVixMultiplier(vixLevel: number) {
  if (vixLevel < 15) return { vixMultiplier: 0.8, vixAction: "市场乐观，减码观望" };
  if (vixLevel <= 25) return { vixMultiplier: 1, vixAction: "市场中性，正常投资" };
  return { vixMultiplier: 1.3, vixAction: "市场恐慌，增加投资" };
}

function getMarketStatus(dropPercentage: number) {
  if (dropPercentage < 5) return "市场稳定 😌";
  if (dropPercentage < 10) return "小幅回调 😐";
  if (dropPercentage < 15) return "中度回调 😟";
  return "深度回调 😱";
}


export default function DcaVixPage() {
  const [inputs, setInputs] = useState<InputsState>(defaultInputs);
  const [etfPrices] = useState(defaultEtfPrices);
  const [results, setResults] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [ignoreNegativeFG, setIgnoreNegativeFG] = useState(true); // 是否忽略负数减码
  const recordTableRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    handleCalculate();
    // eslint-disable-next-line
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setIgnoreNegativeFG(checked);
    } else {
      setInputs((prev) => ({ ...prev, [id]: value }));
    }
  }


// 输入区块组件（移到组件外部，防止每次渲染都重建导致 input blur）
type DcaVixInputsProps = {
  inputs: InputsState;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  ignoreNegativeFG: boolean;
};

function DcaVixInputs({ inputs, handleInputChange, ignoreNegativeFG }: DcaVixInputsProps) {
  return (
    <div className={styles["input-grid"]}>
      <div className={styles["input-card"]}>
        <h3>💰 资金配置</h3>
        <div className={styles["input-group"]}>
          <label htmlFor="totalBudget">月度总预算 ($)</label>
          <input type="text" id="totalBudget" inputMode="numeric" pattern="[0-9]*" value={inputs.totalBudget} onChange={handleInputChange} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="baseDCA">基础定投金额 ($)</label>
          <input type="text" id="baseDCA" inputMode="numeric" pattern="[0-9]*" value={inputs.baseDCA} onChange={handleInputChange} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="flexibleFund">灵活资金池 ($)</label>
          <input type="text" id="flexibleFund" inputMode="numeric" pattern="[0-9]*" value={inputs.flexibleFund} onChange={handleInputChange} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="cashReserve">现金储备池 ($)</label>
          <input type="text" id="cashReserve" inputMode="numeric" pattern="[0-9]*" value={inputs.cashReserve} onChange={handleInputChange} />
        </div>
      </div>
      <div className={styles["input-card"]}>
        <h3>📊 市场数据</h3>
        <div className={styles["input-group"]}>
          <label htmlFor="currentSPY">当前SPY价格 ($)</label>
          <input type="text" id="currentSPY" inputMode="decimal" pattern="[0-9.]*" value={inputs.currentSPY} onChange={handleInputChange} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="threeMonthHigh">近3个月高点 ($)</label>
          <input type="text" id="threeMonthHigh" inputMode="decimal" pattern="[0-9.]*" value={inputs.threeMonthHigh} onChange={handleInputChange} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="vixLevel">当前VIX指数</label>
          <input type="text" id="vixLevel" inputMode="decimal" pattern="[0-9.]*" value={inputs.vixLevel} onChange={handleInputChange} />
        </div>
      </div>
      <div className={styles["input-card"]}>
        <h3>⚙️ 高级设置</h3>
        <div className={styles["input-group"]}>
          <label htmlFor="vooRatio">VOO在组合中比例 (%)</label>
          <input type="text" id="vooRatio" inputMode="numeric" pattern="[0-9]*" value={inputs.vooRatio} onChange={handleInputChange} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="qqqRatio">QQQ在组合中比例 (%)</label>
          <input type="text" id="qqqRatio" inputMode="numeric" pattern="[0-9]*" value={inputs.qqqRatio} onChange={handleInputChange} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="defensiveRatio">防御类ETF比例 (%)</label>
          <input type="text" id="defensiveRatio" inputMode="numeric" pattern="[0-9]*" value={inputs.defensiveRatio} onChange={handleInputChange} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="fearGreed">Fear & Greed 指数 (0-100)</label>
          <input type="text" id="fearGreed" inputMode="numeric" pattern="[0-9]*" value={inputs.fearGreed} onChange={handleInputChange} />
        </div>
        <div className={styles["input-group"]} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" id="ignoreNegativeFG" checked={ignoreNegativeFG} onChange={handleInputChange} />
          <label htmlFor="ignoreNegativeFG">只在恐惧时加码，不在贪婪时减码</label>
        </div>
      </div>
    </div>
  );
}

  // Fear & Greed 调整逻辑
  function getFearGreedAdjustment(fg: number) {
    if (fg < 25) return 166;
    if (fg < 50) return 83;
    if (fg < 70) return 0;
    return ignoreNegativeFG ? 0 : -166;
  }

  function getFearGreedLabel(fg: number) {
    if (fg < 25) return "极度恐惧 (加码)";
    if (fg < 50) return "恐惧偏中性 (正常)";
    if (fg < 70) return "偏贪婪 (降低投入)";
    return "极度贪婪 (减码)";
  }

  function handleCalculate() {
    // For calculation, convert string to number, treat empty string as 0
    const toNum = (v: string) => v === "" ? 0 : Number(v);
    const dropPercentage = getDropPercentage(toNum(inputs.threeMonthHigh), toNum(inputs.currentSPY));
    const dipAmount = getDipAmount(dropPercentage, toNum(inputs.flexibleFund));
    const { vixMultiplier, vixAction } = getVixMultiplier(toNum(inputs.vixLevel));
    const adjustedDipAmount = dipAmount * vixMultiplier;
    const fgAdjustment = getFearGreedAdjustment(toNum(inputs.fearGreed));
    const totalInvestment = toNum(inputs.baseDCA) + adjustedDipAmount + fgAdjustment;
    const vooAmount = (toNum(inputs.baseDCA) * toNum(inputs.vooRatio)) / 100 + adjustedDipAmount * 0.6 + fgAdjustment * 0.5;
    const qqqAmount = (toNum(inputs.baseDCA) * toNum(inputs.qqqRatio)) / 100 + adjustedDipAmount * 0.4 + fgAdjustment * 0.5;
    const defensiveAmount = (toNum(inputs.baseDCA) * toNum(inputs.defensiveRatio)) / 100;
    const marketStatus = getMarketStatus(dropPercentage);

    setResults({
      date: new Date().toISOString().split("T")[0],
      totalBudget: toNum(inputs.totalBudget),
      baseDCA: toNum(inputs.baseDCA),
      flexibleFund: toNum(inputs.flexibleFund),
      cashReserve: toNum(inputs.cashReserve),
      currentSPY: toNum(inputs.currentSPY),
      threeMonthHigh: toNum(inputs.threeMonthHigh),
      dropPercentage,
      vixLevel: toNum(inputs.vixLevel),
      vixAction,
      dipAmount,
      adjustedDipAmount,
      fgAdjustment,
      fearGreed: toNum(inputs.fearGreed),
      fgLabel: getFearGreedLabel(toNum(inputs.fearGreed)),
      totalInvestment,
      vooAmount,
      qqqAmount,
      defensiveAmount,
      marketStatus,
      vooRatio: toNum(inputs.vooRatio),
      qqqRatio: toNum(inputs.qqqRatio),
      defensiveRatio: toNum(inputs.defensiveRatio),
    });
  }

  function handleAddToRecord() {
    if (!results) return;
    setRecords((prev) => [...prev, { ...results }]);
    setTimeout(() => {
      if (recordTableRef.current) {
        recordTableRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }

  function handleDownloadCSV() {
    if (records.length === 0) {
      alert("没有投资记录可下载！");
      return;
    }
    const headers = [
      "日期",
      "SPY价格",
      "回调幅度",
      "VIX",
      "基础定投",
      "加码金额",
      "总投入",
      "市场状态",
    ];
    const csvContent = [
      headers.join(","),
      ...records.map((record) =>
        [
          record.date,
          record.currentSPY.toFixed(2),
          record.dropPercentage.toFixed(1) + "%",
          record.vixLevel,
          record.baseDCA.toFixed(2),
          record.adjustedDipAmount.toFixed(2),
          record.totalInvestment.toFixed(2),
          record.marketStatus,
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "Layered_Investment_Strategy_Records.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleShowETFPrices() {
    alert(`当前ETF参考价格：\nVOO: ${etfPrices.VOO}\nQQQ: ${etfPrices.QQQ}\nSCHD: ${etfPrices.SCHD}\nVYM: ${etfPrices.VYM}\nXLU: ${etfPrices.XLU}\nJNJ: ${etfPrices.JNJ}\nBIL: ${etfPrices.BIL}\n\n注意：这些是示例价格，实际投资时请查询最新价格。`);
  }

  function handleClearRecord() {
    if (window.confirm("确定要清空所有投资记录吗？")) {
      setRecords([]);
    }
  }

  // --- Render helpers ---
  function renderETFTableBody() {
    if (!results) return null;
    const etfAllocations = [
      {
        code: "VOO",
        name: "Vanguard S&P 500 ETF",
        type: "大盘指数",
        amount: results.vooAmount,
        price: etfPrices.VOO,
        description: "基础配置+加码",
      },
      {
        code: "QQQ",
        name: "Invesco QQQ Trust",
        type: "科技成长",
        amount: results.qqqAmount,
        price: etfPrices.QQQ,
        description: "成长配置+加码",
      },
      {
        code: "SCHD",
        name: "Schwab US Dividend Equity",
        type: "分红股",
        amount: results.defensiveAmount * 0.6,
        price: etfPrices.SCHD,
        description: "防御性配置",
      },
      {
        code: "VYM",
        name: "Vanguard High Dividend Yield",
        type: "高分红",
        amount: results.defensiveAmount * 0.4,
        price: etfPrices.VYM,
        description: "收益性配置",
      },
    ];
    return etfAllocations.map((etf) => {
      if (etf.amount > 0) {
        const shares = etf.amount / etf.price;
        return (
          <tr key={etf.code}>
            <td><strong>{etf.code}</strong></td>
            <td>{etf.name}</td>
            <td>{etf.type}</td>
            <td><strong>${etf.amount.toFixed(2)}</strong></td>
            <td>${etf.price.toFixed(2)}</td>
            <td>{shares.toFixed(2)}</td>
            <td>{etf.description}</td>
          </tr>
        );
      }
      return null;
    });
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>📈 分层投资策略计算器</h1>
          <p>Buy the Dip + VIX 混合策略 | 智能资金分配管理</p>
        </div>
        <div className={styles["main-content"]}>
          <DcaVixInputs inputs={inputs} handleInputChange={handleInputChange} ignoreNegativeFG={ignoreNegativeFG} />
          <div className={styles["calculate-section"]}>
            <button className={styles["calculate-btn"]} onClick={handleCalculate}>
              🚀 计算本月投资策略
            </button>
          </div>
          <div className={styles["results-container"]}>
            {results && (
              <>
                <div className={styles["strategy-overview"]}>
                  <h2>📋 本月投资策略总览</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
                    <div>
                      <h4>📊 总投资金额</h4>
                      <p style={{ fontSize: "2em", fontWeight: "bold" }}>${results.totalInvestment.toFixed(2)}</p>
                    </div>
                    <div>
                      <h4>📈 市场回调</h4>
                      <p style={{ fontSize: "2em", fontWeight: "bold" }}>{results.dropPercentage.toFixed(1)}%</p>
                    </div>
                    <div>
                      <h4>😰 VIX指数</h4>
                      <p style={{ fontSize: "2em", fontWeight: "bold" }}>{results.vixLevel}</p>
                    </div>
                    <div>
                      <h4>💰 加码金额</h4>
                      <p style={{ fontSize: "2em", fontWeight: "bold" }}>${results.adjustedDipAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <h4>🧮 Fear & Greed</h4>
                      <p style={{ fontSize: "2em", fontWeight: "bold" }}>{results.fearGreed} <span style={{ fontSize: '0.7em' }}>{results.fgLabel}</span></p>
                      <p style={{ fontSize: "1.2em", color: results.fgAdjustment > 0 ? '#27ae60' : results.fgAdjustment < 0 ? '#e74c3c' : '#34495e' }}>
                        调整金额: {results.fgAdjustment > 0 ? '+' : ''}{results.fgAdjustment}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles["market-signals"]}>
                  <h3 style={{ color: "#856404", marginBottom: 20 }}>🎯 市场信号分析</h3>
                  <div>
                    <div className={styles["signal-item"]}>
                      <div className={styles["signal-icon"]}>{results.dropPercentage >= 10 ? "📉" : results.dropPercentage >= 5 ? "📊" : "📈"}</div>
                      <div className={styles["signal-content"]}>
                        <div className={styles["signal-title"]}>回调信号: {results.marketStatus}</div>
                        <div>SPY从高点{results.threeMonthHigh.toFixed(2)}回调至{results.currentSPY.toFixed(2)}，回调幅度{results.dropPercentage.toFixed(1)}%</div>
                      </div>
                    </div>
                    <div className={styles["signal-item"]}>
                      <div className={styles["signal-icon"]}>{results.vixLevel > 25 ? "😱" : results.vixLevel < 15 ? "😌" : "😐"}</div>
                      <div className={styles["signal-content"]}>
                        <div className={styles["signal-title"]}>恐慌信号: {results.vixAction}</div>
                        <div>当前VIX为{results.vixLevel}，调整投资金额{results.dipAmount > 0 ? (((results.adjustedDipAmount / results.dipAmount - 1) * 100).toFixed(0)) : 0}%</div>
                      </div>
                    </div>
                    <div className={styles["signal-item"]}>
                      <div className={styles["signal-icon"]}>{results.fearGreed < 25 ? "😱" : results.fearGreed < 50 ? "😨" : results.fearGreed < 70 ? "😐" : "😈"}</div>
                      <div className={styles["signal-content"]}>
                        <div className={styles["signal-title"]}>情绪信号: {results.fgLabel}</div>
                        <div>Fear & Greed 指数为 {results.fearGreed}，调整金额 {results.fgAdjustment > 0 ? '+' : ''}{results.fgAdjustment}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles["allocation-grid"]}>
                  <div className={styles["allocation-card"]}>
                    <h3>🏦 基础定投分配</h3>
                    <div className={styles["allocation-item"]}>
                      <span>VOO (大盘指数)</span>
                      <span className={styles["allocation-amount"]}>${(results.baseDCA * results.vooRatio / 100).toFixed(2)}</span>
                    </div>
                    <div className={styles["allocation-item"]}>
                      <span>QQQ (科技成长)</span>
                      <span className={styles["allocation-amount"]}>${(results.baseDCA * results.qqqRatio / 100).toFixed(2)}</span>
                    </div>
                    <div className={styles["allocation-item"]}>
                      <span>防御类ETF</span>
                      <span className={styles["allocation-amount"]}>${results.defensiveAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className={styles["allocation-card"]}>
                    <h3>⚡ 灵活加码分配</h3>
                    <div className={styles["allocation-item"]}>
                      <span>VOO 加码</span>
                      <span className={styles["allocation-amount"]}>${(results.adjustedDipAmount * 0.6).toFixed(2)}</span>
                    </div>
                    <div className={styles["allocation-item"]}>
                      <span>QQQ 加码</span>
                      <span className={styles["allocation-amount"]}>${(results.adjustedDipAmount * 0.4).toFixed(2)}</span>
                    </div>
                    <div className={styles["allocation-item"]}>
                      <span>剩余现金</span>
                      <span className={styles["allocation-amount"]}>${(results.flexibleFund - results.adjustedDipAmount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className={styles["detailed-allocation"]}>
                  <h3 style={{ color: "#2c3e50", marginBottom: 20 }}>📊 详细ETF分配表</h3>
                  <table className={styles["etf-table"]}>
                    <thead>
                      <tr>
                        <th>ETF代码</th>
                        <th>ETF名称</th>
                        <th>类型</th>
                        <th>投资金额</th>
                        <th>当前价格</th>
                        <th>预计股数</th>
                        <th>说明</th>
                      </tr>
                    </thead>
                    <tbody>{renderETFTableBody()}</tbody>
                  </table>
                </div>
              </>
            )}
          </div>
          <div className={styles["record-section"]}>
            <h3 style={{ color: "#2c3e50", marginBottom: 20 }}>📈 投资记录追踪</h3>
            <table className={styles["etf-table"]}>
              <thead>
                <tr>
                  <th>日期</th>
                  <th>SPY价格</th>
                  <th>回调幅度</th>
                  <th>VIX</th>
                  <th>基础定投</th>
                  <th>加码金额</th>
                  <th>总投入</th>
                  <th>市场状态</th>
                </tr>
              </thead>
              <tbody ref={recordTableRef}>
                {records.map((record, idx) => (
                  <tr
                    key={idx}
                    style={
                      record.dropPercentage >= 10 || record.vixLevel > 25
                        ? { backgroundColor: "#fff3cd", borderLeft: "4px solid #ffc107" }
                        : {}
                    }
                  >
                    <td>{record.date}</td>
                    <td>${record.currentSPY.toFixed(2)}</td>
                    <td>{record.dropPercentage.toFixed(1)}%</td>
                    <td>{record.vixLevel}</td>
                    <td>${record.baseDCA.toFixed(2)}</td>
                    <td>${record.adjustedDipAmount.toFixed(2)}</td>
                    <td><strong>${record.totalInvestment.toFixed(2)}</strong></td>
                    <td>{record.marketStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles["action-buttons"]}>
            <button className={styles["action-btn"] + ' ' + styles["btn-success"]} onClick={handleAddToRecord}>➕ 添加到记录</button>
            <button className={styles["action-btn"] + ' ' + styles["btn-primary"]} onClick={handleDownloadCSV}>📁 导出CSV</button>
            <button className={styles["action-btn"] + ' ' + styles["btn-warning"]} onClick={handleShowETFPrices}>💹 更新ETF价格</button>
            <button className={styles["action-btn"] + ' ' + styles["btn-danger"]} onClick={handleClearRecord}>🗑️ 清空记录</button>
          </div>
          <div className={styles["tips-section"]}>
            <h3>💡 投资执行建议</h3>
            <ul>
              <li>每月1号执行策略计算和投资</li>
              <li>市场回调5%以下时，将灵活资金继续存为现金</li>
              <li>VIX超过25时，考虑超配QQQ等成长股</li>
              <li>大跌超过15%时，可动用现金储备池一次性加码</li>
              <li>保持长期纪律，不要因短期波动改变策略</li>
              <li>定期回顾3个月高点，确保参考基准的准确性</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
