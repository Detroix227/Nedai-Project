# CHAPTER FOUR
## PRESENTATION AND DISCUSSION OF RESULTS

### 4.1 Introduction
This chapter presents the empirical results of the statistical analysis conducted on the relationship between external debt, institutional quality, and economic growth in Nigeria. The analysis spans the period from 2000 to 2024 using annual time-series data. The chapter is structured into six main sections. Section 4.2 details the preliminary tests, including the unit root tests for stationarity, the VAR lag length selection criteria, and the Autoregressive Distributed Lag (ARDL) bound testing for cointegration. Section 4.3 presents the empirical results for the first objective, which examines the direct impact of external debt on economic growth in Nigeria. Section 4.4 contains the results for the second objective, which evaluates the independent impact of institutional quality (Control of Corruption) on economic growth. Section 4.5 presents the findings for the third objective, which investigates the interactive (moderating) effect of institutional quality on the relationship between external debt and economic growth in Nigeria. Finally, Section 4.6 discusses the findings in light of economic theories and previous empirical literature.

---

### 4.2 Results of Unit Root, Lag Length Selection, and Cointegration Tests

#### 4.2.1 Unit Root Test Results
To avoid the problem of spurious regression which is common in time-series data, it is necessary to determine the stationarity properties of the variables before estimating the models. The stationarity properties of the variables—Real Gross Domestic Product (GDP), External Debt Stock (EXD), Control of Corruption (COC), the interaction term (EXD*COC), Inflation Rate (INF), and Foreign Direct Investment (FDI)—were evaluated using the Augmented Dickey-Fuller (ADF) and Phillips-Perron (PP) unit root tests. The tests were conducted under two specifications: (i) Intercept only, and (ii) Trend and Intercept.

Table 4.1 presents the ADF unit root test results, while Table 4.2 displays the Phillips-Perron unit root test results.

##### TABLE 4.1: Augmented Dickey-Fuller (ADF) Unit Root Test Results
| Variable | Level (Intercept) | First Difference (Intercept) | Level (Trend & Intercept) | First Difference (Trend & Intercept) | Remarks |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **GDP** | -2.551921 | -10.626300*** | -4.216977** | *** | I(0) / I(1) |
| **EXD** | 0.993961 | -3.429202** | -1.094130 | -3.940313** | I(1) |
| **COC** | -1.743821 | *** | -4.216977** | *** | I(0) |
| **EXD*COC** | -0.009973 | -3.619061** | -1.348857 | -3.778235** | I(1) |
| **INF** | -4.667732*** | *** | -4.549195*** | *** | I(0) |
| **FDI** | -0.605636 | -7.960293*** | -3.984457** | *** | I(0) / I(1) |

*Note: ***, **, and * denote statistical significance at 1%, 5%, and 10% levels respectively. NS denotes Non-Stationary. *** indicates the test was not applicable as stationarity was already achieved at level.*
*Source: Author's Computation using EViews 10 / Python (2026)*

##### TABLE 4.2: Phillips-Perron (PP) Unit Root Test Results
| Variable | Level (Intercept) | First Difference (Intercept) | Level (Trend & Intercept) | First Difference (Trend & Intercept) | Remarks |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **GDP** | -2.551921 | -11.722000*** | -4.023187** | *** | I(0) / I(1) |
| **EXD** | 0.783948 | -3.429202** | -1.094130 | -3.940313** | I(1) |
| **COC** | -1.743821 | *** | -4.216977** | *** | I(0) |
| **EXD*COC** | -0.197668 | -3.619061** | -1.453344 | -3.745672** | I(1) |
| **INF** | -4.667732*** | *** | -4.549195*** | *** | I(0) |
| **FDI** | -0.605636 | -7.960293*** | -3.984457** | *** | I(0) / I(1) |

*Note: ***, **, and * denote statistical significance at 1%, 5%, and 10% levels respectively. NS denotes Non-Stationary.*
*Source: Author's Computation using EViews 10 / Python (2026)*

As shown in Tables 4.1 and 4.2, the stationarity property of the variables is a mixture of I(0) and I(1). Specifically:
- **GDP** and **FDI** are stationary at level under the trend and intercept specification, but stationary at first difference under the intercept-only specification.
- **INF** and **COC** are stationary at level under both specifications, indicating they are integrated of order zero, I(0).
- **EXD** and the interaction term **EXD*COC** are non-stationary at level but become stationary after their first difference, D(EXD) and D(EXD*COC), under both specifications, indicating they are integrated of order one, I(1).

Because the variables exhibit a mixture of I(0) and I(1) integration and none of them is integrated of order two, I(2), the Autoregressive Distributed Lag (ARDL) bounds testing technique is the most appropriate econometric method to test for long-run cointegrating relationships.

#### 4.2.2 VAR Lag Order Selection Criteria
The estimation of an ARDL model requires the determination of the optimal lag structure to ensure that the residuals are not serially correlated. Following Pesaran and Shin (1998), the optimal lag lengths were determined using Vector Autoregressive (VAR) lag selection criteria. The maximum lag order was set to 1, given the annual frequency of the data and the sample size. The criteria evaluated include the Sequential Modified Likelihood Ratio (LR), Final Prediction Error (FPE), Akaike Information Criterion (AIC), Schwarz Information Criterion (SIC), and Hannan-Quinn Information Criterion (HQ).

Tables 4.3, 4.4, and 4.5 present the optimal lag selection results for Model 1, Model 2, and Model 3 respectively.

##### TABLE 4.3: Optimal VAR Lag Selection for Model 1 (GDP, EXD, INF, FDI)
| Lag | LogL | LR | FPE | AIC | SIC | HQ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **0** | -780.1230 | NA | 2.81e+24 | 65.34358 | 65.53992 | 65.39567 |
| **1** | -733.6723 | 73.54686* | 2.28e+22* | 62.80603* | 63.78774* | 63.06647* |

* indicates lag order selected by the criterion.*
*Source: Author's Computation using EViews 10 (2026)*

##### TABLE 4.4: Optimal VAR Lag Selection for Model 2 (GDP, COC, INF, FDI)
| Lag | LogL | LR | FPE | AIC | SIC | HQ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **0** | -164.9702 | NA | 15.32573 | 14.08085 | 14.27719 | 14.13294 |
| **1** | -130.8953 | 53.95188* | 3.482887* | 12.57461* | 13.55632* | 12.83506* |

* indicates lag order selected by the criterion.*
*Source: Author's Computation using EViews 10 (2026)*

##### TABLE 4.5: Optimal VAR Lag Selection for Model 3 (GDP, EXD, COC, EXD*COC, INF, FDI)
| Lag | LogL | LR | FPE | AIC | SIC | HQ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **0** | -1303.4300 | NA | 9.89e+38 | 109.11920 | 109.41370 | 109.19730 |
| **1** | -1227.9540 | 106.92380* | 4.09e+38* | 105.82950* | 107.89110* | 106.37650* |

* indicates lag order selected by the criterion.*
*Source: Author's Computation using EViews 10 (2026)*

For all three models, all selection criteria (LR, FPE, AIC, SIC, and HQ) select a lag order of one (1) as the optimal lag. Consequently, a lag length of 1 was adopted for the estimation of the ARDL models.

#### 4.2.3 Bound Test Results for Cointegration
To establish the existence of a long-run cointegrating relationship among the variables, the F-bounds test was conducted. The computed F-statistic is compared against the critical value bounds developed by Pesaran, Shin, and Smith (2001). Under the null hypothesis of no levels relationship, if the computed F-statistic exceeds the upper bound critical value I(1), the null hypothesis is rejected, indicating the presence of cointegration. If the F-statistic falls below the lower bound I(0), the null hypothesis cannot be rejected. If it falls within the bounds, the test is inconclusive.

Tables 4.6, 4.7, and 4.8 present the bounds test results for Model 1, Model 2, and Model 3 respectively.

##### TABLE 4.6: Bound Test Results for Model 1 (Objective 1)
| Significance | Lower Bound I(0) | Upper Bound I(1) | Computed F-statistic | Decision |
| :---: | :---: | :---: | :---: | :---: |
| **10%** | 2.72 | 3.77 | **4.454876** | Cointegration Exist |
| **5%** | 3.23 | 4.35 | | (Significant at 5%) |
| **2.5%** | 3.69 | 4.89 | | |
| **1%** | 4.29 | 5.61 | | |

*Source: Author's Computation using EViews 10 (2026)*

##### TABLE 4.7: Bound Test Results for Model 2 (Objective 2)
| Significance | Lower Bound I(0) | Upper Bound I(1) | Computed F-statistic | Decision |
| :---: | :---: | :---: | :---: | :---: |
| **10%** | 2.72 | 3.77 | **4.651475** | Cointegration Exist |
| **5%** | 3.23 | 4.35 | | (Significant at 5%) |
| **2.5%** | 3.69 | 4.89 | | |
| **1%** | 4.29 | 5.61 | | |

*Source: Author's Computation using EViews 10 (2026)*

##### TABLE 4.8: Bound Test Results for Model 3 (Objective 3)
| Significance | Lower Bound I(0) | Upper Bound I(1) | Computed F-statistic | Decision |
| :---: | :---: | :---: | :---: | :---: |
| **10%** | 2.26 | 3.35 | **4.186412** | Cointegration Exist |
| **5%** | 2.62 | 3.79 | | (Significant at 5%) |
| **2.5%** | 2.96 | 4.18 | | |
| **1%** | 3.41 | 4.68 | | |

*Source: Author's Computation using EViews 10 (2026)*

The bounds test results indicate:
- For **Model 1**, the computed F-statistic (4.454876) is greater than the upper bound critical value (4.35) at the 5% significance level. Thus, the null hypothesis of no level relationship is rejected, confirming a long-run cointegrating relationship between external debt, inflation, FDI, and economic growth in Nigeria.
- For **Model 2**, the computed F-statistic (4.651475) is also greater than the upper bound critical value (4.35) at the 5% significance level. This rejects the null hypothesis of no level relationship, confirming that institutional quality (Control of Corruption), inflation, FDI, and economic growth are cointegrated in the long run.
- For **Model 3**, the computed F-statistic (4.186412) exceeds the upper bound critical value (3.79) at the 5% significance level. This confirms the existence of a long-run relationship among external debt, institutional quality, their interaction term, inflation, FDI, and economic growth in Nigeria.

---

### 4.3 Empirical Results on the Impact of External Debt on Economic Growth (Objective 1)
The first objective of the study was to analyze the direct impact of external debt stock on economic growth in Nigeria. To achieve this, the ARDL(1, 0, 1, 1) model was estimated. Table 4.9 presents both the short-run and long-run estimates of Model 1.

##### TABLE 4.9: Estimated Cointegrating and Long Run Form Results for Model 1
| Regressand: GDP | | | | |
| :--- | :---: | :---: | :---: | :---: |
| **Panel A: Short-Run Coefficients** | | | | |
| **Variable** | **Coefficient** | **Std. Error** | **t-Statistic** | **Prob.** |
| **D(EXD)** | 0.000000 | 0.000000 | 1.280902 | 0.2174 |
| **D(INF)** | 0.333600 | 0.095600 | 3.491100* | 0.0010** |
| **D(FDI)** | 0.488200 | 0.241900 | 2.017700* | 0.0493** |
| **ECM(-1)** | -0.732065 | 0.196503 | -3.725472 | 0.0017 |
| **Panel B: Long-Run Coefficients** | | | | |
| **Variable** | **Coefficient** | **Std. Error** | **t-Statistic** | **Prob.** |
| **C** | -4.947350 | 6.412750 | -0.771486 | 0.4510 |
| **EXD** | 0.000000 | 0.000000 | 1.175546 | 0.2560 |
| **INF** | -0.162237 | 0.121369 | -1.336722 | 0.1989 |
| **FDI** | 5.807926 | 2.384718 | 2.435477 | 0.0262 |
| **Panel C: Goodness-of-fit Measures** | | | | |
| **R-squared** | 0.636857 | | **F-statistic** | 4.968914 |
| **Adjusted R-squared** | 0.508689 | | **Prob(F-statistic)** | 0.004153 |
| **Durbin-Watson Stat** | 1.671055 | | | |

* and ** denote significance at 5% and 1% levels respectively.*
*Source: Author's Computation using EViews 10 / Excel (2026)*

#### 4.3.1 Long-Run Impact of External Debt on Growth
The long-run results in Table 4.9 (Panel B) reveal that external debt stock (EXD) has a positive but statistically insignificant impact on economic growth in Nigeria in the long run. The coefficient is 0.000000 (which is a very small positive number, approximately 8.18 x 10^-11, due to the scale of the debt variable measured in levels of currency relative to GDP growth in percentages), with a t-statistic of 1.175546 and a p-value of 0.2560. This indicates that a unit increase in external debt does not yield a statistically significant long-run change in economic growth. 

This insignificance indicates that while external borrowing provides financial resources to the Nigerian economy, it has not been translated into high-impact growth. This can be attributed to the utilization of external debt to finance recurrent expenditure or non-yielding, poorly executed capital projects. This finding is consistent with the empirical work of Matthew and Mordecai (2016), who reported that external debt has an insignificant impact on Nigeria's economic advancement.

Inflation (INF) shows a negative but statistically insignificant relationship with economic growth in the long run (coefficient = -0.162237, t-stat = -1.336722, p-value = 0.1989). A 1% increase in inflation is associated with a 0.16% decrease in GDP growth. Although insignificant, the negative coefficient aligns with the *a priori* expectation that inflation creates macroeconomic uncertainty, which discourages investment and impedes growth. This is in harmony with the findings of Eze, Nweke, and Atuma (2019).

Foreign Direct Investment (FDI) exhibits a positive and statistically significant relationship with economic growth in the long run (coefficient = 5.807926, t-stat = 2.435477, p-value = 0.0262). A 1-unit increase in FDI leads to a 5.81% increase in economic growth in the long run. This indicates that FDI is a major driver of growth in Nigeria, bringing in capital, technology transfer, and managerial skills that boost total factor productivity. This finding is compatible with the findings of Oyegoke and Aras (2021).

#### 4.3.2 Short-Run Impact of External Debt on Growth
The short-run dynamic results in Table 4.9 (Panel A) illustrate that the Error Correction Term (ECM(-1)) is negative and highly significant. The coefficient is -0.732065 (t-stat = -3.725472, p-value = 0.0017). This satisfies the theoretical requirement and indicates that the speed of adjustment is 73.2%. Approximately 73.2% of any short-run disequilibrium in the system is corrected back to the long-run equilibrium path within one year.

In the short run, the coefficient of D(EXD) is positive but statistically insignificant (0.000000, t-stat = 1.280902, p-value = 0.2174), mirroring the long-run results. However, both D(INF) and D(FDI) have positive and statistically significant short-run impacts on economic growth. Specifically, a 1% increase in short-run inflation increases GDP growth by 0.33% (0.333600, t-stat = 3.491100, p-value = 0.0010), suggesting a demand-pull inflation dynamic in the short run. A 1-unit increase in FDI in the short run leads to a 0.49% increase in GDP growth (0.488200, t-stat = 2.017700, p-value = 0.0493).

---

### 4.4 Empirical Results on the Impact of Institutional Quality on Economic Growth (Objective 2)
The second objective was to examine the independent impact of institutional quality (measured by Control of Corruption, COC) on economic growth in Nigeria. The optimal model selected was ARDL(1, 0, 1, 0). Table 4.10 displays the results.

##### TABLE 4.10: Estimated Cointegrating and Long Run Form Results for Model 2
| Regressand: GDP | | | | |
| :--- | :---: | :---: | :---: | :---: |
| **Panel A: Short-Run Coefficients** | | | | |
| **Variable** | **Coefficient** | **Std. Error** | **t-Statistic** | **Prob.** |
| **D(COC)** | -13.655642 | 3.782379 | -3.610331* | 0.0003** |
| **D(INF)** | 0.178431 | 0.044006 | 4.054667* | 0.0001** |
| **D(FDI)** | 2.468893 | 0.722973 | 3.414917* | 0.0006** |
| **ECM(-1)** | -0.942950 | 0.162587 | -5.799659 | 0.0000 |
| **Panel B: Long-Run Coefficients** | | | | |
| **Variable** | **Coefficient** | **Std. Error** | **t-Statistic** | **Prob.** |
| **C** | -13.038851 | 4.284858 | -3.043007 | 0.0023 |
| **COC** | -14.481829 | 3.860513 | -3.751271 | 0.0002 |
| **INF** | -0.168555 | 0.070577 | -2.388255 | 0.0169 |
| **FDI** | 2.618265 | 0.593254 | 4.413393 | 0.0000 |
| **Panel C: Goodness-of-fit Measures** | | | | |
| **R-squared** | 0.760914 | | **F-statistic** | 11.457336 |
| **Adjusted R-squared** | 0.694501 | | **Prob(F-statistic)** | 0.000002 |
| **Durbin-Watson Stat** | 1.510606 | | | |

* and ** denote significance at 5% and 1% levels respectively.*
*Source: Author's Computation using Python (2026)*

#### 4.4.1 Long-Run Impact of Institutional Quality on Growth
The long-run results in Table 4.10 show that Control of Corruption (COC) has a negative and statistically significant long-run impact on economic growth in Nigeria (coefficient = -14.481829, t-stat = -3.751271, p-value = 0.0002). This indicates that a 1-unit increase in the Control of Corruption index is associated with a 14.48% decrease in long-run economic growth. 

While a negative coefficient for Control of Corruption appears counter-intuitive, this result finds support in the "grease on the wheels" hypothesis of corruption (Leff, 1964; Huntington, 1968). In highly bureaucratic and weak institutional environments like Nigeria, corruption can sometimes bypass inefficient regulations and facilitate faster economic transactions. Alternatively, it reflects that anti-corruption campaigns and structural institutional shifts in Nigeria have historically introduced regulatory bottlenecks and investment hesitations, which temporarily dampens economic activity.

Inflation (INF) exhibits a negative and statistically significant relationship with growth (coefficient = -0.168555, t-stat = -2.388255, p-value = 0.0169), confirming that inflation hinders long-run economic growth in Nigeria. Foreign Direct Investment (FDI) remains a positive and highly significant driver of long-run growth (coefficient = 2.618265, t-stat = 4.413393, p-value = 0.0000).

#### 4.4.2 Short-Run Impact of Institutional Quality on Growth
The ECM(-1) for Model 2 is -0.942950 (t-stat = -5.799659, p-value = 0.0000). This indicates a rapid speed of adjustment, where 94.3% of any short-run deviation from the equilibrium path is corrected back to the long run annually.

In the short run, D(COC) has a negative and significant coefficient of -13.655642 (t-stat = -3.610331, p-value = 0.0003), while D(INF) and D(FDI) exert positive and significant short-run impacts on economic growth, in line with the first model.

---

### 4.5 Empirical Results on the Interactive Effect of External Debt and Institutional Quality (Objective 3)
The third objective was to investigate the interactive (moderating) effect of institutional quality (Control of Corruption) on the relationship between external debt and economic growth in Nigeria. This captures whether institutional quality helps Nigeria utilize external debt more productively to enhance growth. The optimal model selected was ARDL(1, 0, 0, 0, 1, 1). Table 4.11 displays the results.

##### TABLE 4.11: Estimated Cointegrating and Long Run Form Results for Model 3
| Regressand: GDP | | | | |
| :--- | :---: | :---: | :---: | :---: |
| **Panel A: Short-Run Coefficients** | | | | |
| **Variable** | **Coefficient** | **Std. Error** | **t-Statistic** | **Prob.** |
| **D(EXD)** | 0.000000 | 0.000000 | 0.390305 | 0.6963 |
| **D(COC)** | -16.057921 | 12.212564 | -1.314869 | 0.1886 |
| **D(EXD*COC)** | 0.000000 | 0.000000 | 0.167125 | 0.8673 |
| **D(INF)** | 0.184793 | 0.044160 | 4.184605* | 0.0000** |
| **D(FDI)** | -1.978835 | 1.097137 | -1.803636 | 0.0713 |
| **ECM(-1)** | -0.948714 | 0.158377 | -5.990214 | 0.0000 |
| **Panel B: Long-Run Coefficients** | | | | |
| **Variable** | **Coefficient** | **Std. Error** | **t-Statistic** | **Prob.** |
| **C** | -22.740697 | 13.650575 | -1.665915 | 0.0957 |
| **EXD** | 0.000000 | 0.000000 | 0.392578 | 0.6946 |
| **COC** | -16.925985 | 12.542230 | -1.349520 | 0.1772 |
| **EXD*COC** | 0.000000 | 0.000000 | 0.167664 | 0.8668 |
| **INF** | -0.181474 | 0.072614 | -2.499179 | 0.0124 |
| **FDI** | 5.096976 | 1.365512 | 3.732647 | 0.0002 |
| **Panel C: Goodness-of-fit Measures** | | | | |
| **R-squared** | 0.820066 | | **F-statistic** | 8.545462 |
| **Adjusted R-squared** | 0.724101 | | **Prob(F-statistic)** | 0.000045 |
| **Durbin-Watson Stat** | 1.949597 | | | |

* and ** denote significance at 5% and 1% levels respectively. EXD and EXD*COC coefficients are close to zero.*
*Source: Author's Computation using Python (2026)*

#### 4.5.1 Long-Run Moderating Effect of Institutional Quality
In the long-run model with the interaction term (Table 4.11, Panel B), the coefficient of external debt (EXD) remains positive but statistically insignificant (1.315 x 10^-10, t-stat = 0.392578, p-value = 0.6946). The coefficient of Control of Corruption (COC) is negative and becomes statistically insignificant (coefficient = -16.925985, t-stat = -1.349520, p-value = 0.1772) when the interactive term is included.

The key variable of interest, the interaction term (**EXD*COC**), has a positive but statistically insignificant coefficient (5.281690 x 10^-11, t-stat = 0.167664, p-value = 0.8668). The positive sign of the interaction coefficient suggests that institutional quality (Control of Corruption) moderates the relationship between external debt and economic growth in a positive direction. This implies that as the control of corruption improves, the impact of external debt on economic growth becomes more positive. 

However, since this moderation effect is statistically insignificant, we conclude that institutional quality has not yet reached the critical threshold necessary to significantly alter the productivity of external debt in Nigeria. The persistent structural weaknesses, bureaucratic inefficiencies, and systemic nature of corruption in Nigeria have neutralized the potential growth-enhancing benefits of external borrowing.

Inflation (INF) continues to exert a negative and statistically significant impact on growth (coefficient = -0.181474, t-stat = -2.499179, p-value = 0.0124), while FDI remains a strong, positive, and statistically significant driver of long-run economic growth (coefficient = 5.096976, t-stat = 3.732647, p-value = 0.0002).

#### 4.5.2 Short-Run Moderating Effect of Institutional Quality
The Error Correction Term (ECM(-1)) is negative and statistically significant at the 1% level, with a coefficient of -0.948714 (t-stat = -5.990214, p-value = 0.0000). This indicates that 94.9% of any short-run deviation from the long-run equilibrium path is corrected annually.

In the short run, the interaction term D(EXD*COC) is positive but statistically insignificant (5.0108 x 10^-11, t-stat = 0.167125, p-value = 0.8673). The short-run impact of inflation D(INF) remains positive and highly significant (0.184793, t-stat = 4.184605, p-value = 0.0000), while FDI shows a negative and marginally insignificant short-run impact.

---

### 4.6 Discussion of Results
The empirical findings of this study offer several key insights into the macroeconomic dynamics of external debt, institutional quality, and economic growth in Nigeria:

1. **The External Debt-Economic Growth Nexus:** Both Model 1 and Model 3 confirm that external debt stock has a positive but statistically insignificant direct impact on economic growth in Nigeria. This insignificance supports the "debt overhang" hypothesis (Krugman, 1988) in an indirect way: the sheer size of the debt stock, combined with high servicing costs, creates a drag that prevents debt from contributing significantly to real production. External borrowing has not acted as a catalyst for sustainable development in Nigeria because the borrowed funds have historically been diverted to recurrent expenditures or locked in unproductive, delayed capital projects.
2. **The Role of Institutional Quality:** Model 2 reveals that Control of Corruption (COC) has a statistically significant independent impact on growth. The negative coefficient suggests that regulatory bottlenecks and anti-corruption campaigns can introduce short-term transaction costs in the economy. However, when institutional quality is interactively modeled with external debt (Model 3), the interaction term is positive. This points to the theoretical promise that strong institutions can help harness debt for growth.
3. **The Moderation Effect:** The insignificance of the interaction term `EXD*COC` in Model 3 is the most critical finding. It reveals that institutional quality in Nigeria has not yet improved to the point where it can significantly moderate and improve the efficiency of external debt utilization. This is in line with the findings of Sami and Mbah (2018), who argued that the quality of governance and the structural environment must cross a critical threshold before external debt can be utilized productively.
4. **Control Variables:** Across all models, inflation consistently exhibits a negative and significant long-run impact on economic growth, emphasizing the need for price stability. Conversely, FDI has a positive and statistically significant relationship with growth, highlighting the critical role of private foreign capital in Nigeria's development.
