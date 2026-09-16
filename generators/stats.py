"""Answer generators for calculation questions.

Every function returns {"correct": <number>, "tolerance": <abs tolerance>} and may add
"detail" with intermediate values for writing explanations. build.py recomputes each
calculation question from its "generator" and "params" and fails if the keyed option
does not match.

Usage while authoring:  python3 -c "from generators.stats import *; print(cpk(usl=10.4, lsl=9.6, mean=10.1, sd=0.1))"
"""
import math
import numpy as np
from scipy import stats

def _r(x, nd=2):
    return {"correct": round(float(x), nd), "tolerance": 0.5 * 10 ** (-nd) + 1e-9}

# ---- basic metrics ----
def dpu(defects, units, nd=3): return _r(defects / units, nd)
def dpo(defects, units, opps, nd=4): return _r(defects / (units * opps), nd)
def dpmo(defects, units, opps, nd=0): return _r(defects / (units * opps) * 1e6, nd)
def yield_pct(defects, units, opps=1, nd=2): return _r((1 - defects / (units * opps)) * 100, nd)
def fty_pct(good, started, nd=2): return _r(good / started * 100, nd)
def rty_pct(yields, nd=2):
    """yields as percentages, e.g. [98, 95, 99]"""
    y = 1.0
    for v in yields: y *= v / 100
    return _r(y * 100, nd)
def sigma_st(defects, units, opps, nd=2):
    """Short-term sigma level from DPMO with the 1.5 shift (as published sigma tables)."""
    p = 1 - defects / (units * opps)
    return _r(stats.norm.ppf(p) + 1.5, nd)
def sigma_lt(defects, units, opps, nd=2):
    p = 1 - defects / (units * opps)
    return _r(stats.norm.ppf(p), nd)
def sigma_from_dpmo(dpmo_value, shift=1.5, nd=2): return _r(stats.norm.ppf(1 - dpmo_value / 1e6) + shift, nd)
def dpmo_from_sigma(sigma, shift=1.5, nd=0): return _r((1 - stats.norm.cdf(sigma - shift)) * 1e6, nd)
def takt_time(available_minutes, demand_units, nd=2): return _r(available_minutes / demand_units, nd)
def expr(formula, nd=2, **vals):
    """Generic arithmetic: expr(formula="a*b/c", a=1, b=2, c=3). Only math names allowed."""
    allowed = {k: getattr(math, k) for k in dir(math) if not k.startswith("_")}
    allowed.update(vals)
    return _r(eval(formula, {"__builtins__": {}}, allowed), nd)

# ---- descriptive ----
def mean(data, nd=2): return _r(np.mean(data), nd)
def median(data, nd=2): return _r(np.median(data), nd)
def sample_sd(data, nd=2): return _r(np.std(data, ddof=1), nd)
def pop_sd(data, nd=2): return _r(np.std(data, ddof=0), nd)
def sample_var(data, nd=2): return _r(np.var(data, ddof=1), nd)
def data_range(data, nd=2): return _r(max(data) - min(data), nd)
def iqr(data, nd=2): q1, q3 = np.percentile(data, [25, 75]); return _r(q3 - q1, nd)
def cv_pct(data, nd=1): return _r(np.std(data, ddof=1) / np.mean(data) * 100, nd)
def std_error(sd, n, nd=3): return _r(sd / math.sqrt(n), nd)

# ---- normal distribution ----
def z_score(x, mu, sd, nd=2): return _r((x - mu) / sd, nd)
def prob_below(x, mu, sd, nd=4): return _r(stats.norm.cdf((x - mu) / sd), nd)
def prob_above(x, mu, sd, nd=4): return _r(1 - stats.norm.cdf((x - mu) / sd), nd)
def prob_between(lo, hi, mu, sd, nd=4): return _r(stats.norm.cdf((hi - mu) / sd) - stats.norm.cdf((lo - mu) / sd), nd)
def pct_below(x, mu, sd, nd=2): return _r(stats.norm.cdf((x - mu) / sd) * 100, nd)
def pct_above(x, mu, sd, nd=2): return _r((1 - stats.norm.cdf((x - mu) / sd)) * 100, nd)
def pct_between(lo, hi, mu, sd, nd=2): return _r((stats.norm.cdf((hi - mu) / sd) - stats.norm.cdf((lo - mu) / sd)) * 100, nd)
def value_at_percentile(p, mu, sd, nd=2): return _r(mu + stats.norm.ppf(p) * sd, nd)
def z_critical(confidence_pct, two_sided=True, nd=3):
    a = 1 - confidence_pct / 100
    return _r(stats.norm.ppf(1 - a / 2) if two_sided else stats.norm.ppf(1 - a), nd)

# ---- capability ----
def cp(usl, lsl, sd, nd=2): return _r((usl - lsl) / (6 * sd), nd)
def cpk(usl, lsl, mean, sd, nd=2): return _r(min(usl - mean, mean - lsl) / (3 * sd), nd)
def cpu(usl, mean, sd, nd=2): return _r((usl - mean) / (3 * sd), nd)
def cpl(lsl, mean, sd, nd=2): return _r((mean - lsl) / (3 * sd), nd)
def pp(usl, lsl, sd_overall, nd=2): return _r((usl - lsl) / (6 * sd_overall), nd)
def ppk(usl, lsl, mean, sd_overall, nd=2): return _r(min(usl - mean, mean - lsl) / (3 * sd_overall), nd)
def ppm_out_of_spec(usl, lsl, mean, sd, nd=0):
    p = stats.norm.cdf((lsl - mean) / sd) + (1 - stats.norm.cdf((usl - mean) / sd))
    return _r(p * 1e6, nd)
def pct_out_of_spec(usl, lsl, mean, sd, nd=2):
    p = stats.norm.cdf((lsl - mean) / sd) + (1 - stats.norm.cdf((usl - mean) / sd))
    return _r(p * 100, nd)
def sd_from_cp(usl, lsl, cp_value, nd=3): return _r((usl - lsl) / (6 * cp_value), nd)
def sigma_level_from_cpk(cpk_value, nd=2): return _r(3 * cpk_value, nd)

# ---- MSA ----
def grr_sd(ev, av, nd=4): return _r(math.sqrt(ev ** 2 + av ** 2), nd)
def grr_pct_sv(ev, av, tv, nd=1): return _r(math.sqrt(ev ** 2 + av ** 2) / tv * 100, nd)
def grr_pct_tol(ev, av, usl, lsl, k=6, nd=1): return _r(k * math.sqrt(ev ** 2 + av ** 2) / (usl - lsl) * 100, nd)
def ndc(pv, grr, nd=0): return _r(math.floor(1.41 * pv / grr), nd)
def ndc_exact(pv, grr, nd=1): return _r(1.41 * pv / grr, nd)
def tv_from_parts(ev, av, pv, nd=4): return _r(math.sqrt(ev ** 2 + av ** 2 + pv ** 2), nd)
def pct_contribution(component_sd, tv, nd=1): return _r((component_sd / tv) ** 2 * 100, nd)
def bias(measured_mean, reference, nd=3): return _r(measured_mean - reference, nd)
def bias_pct_tol(measured_mean, reference, usl, lsl, nd=1): return _r((measured_mean - reference) / (usl - lsl) * 100, nd)
def attribute_agreement_pct(agree, total, nd=1): return _r(agree / total * 100, nd)

# ---- inference: t tests ----
def t_stat_1sample(xbar, mu0, sd, n, nd=2): return _r((xbar - mu0) / (sd / math.sqrt(n)), nd)
def p_value_1sample(xbar, mu0, sd, n, tail="two", nd=4):
    t = (xbar - mu0) / (sd / math.sqrt(n)); df = n - 1
    if tail == "two": p = 2 * stats.t.sf(abs(t), df)
    elif tail == "greater": p = stats.t.sf(t, df)
    else: p = stats.t.cdf(t, df)
    return _r(p, nd)
def t_stat_2sample(x1, s1, n1, x2, s2, n2, pooled=False, nd=2):
    if pooled:
        sp2 = ((n1 - 1) * s1 ** 2 + (n2 - 1) * s2 ** 2) / (n1 + n2 - 2)
        se = math.sqrt(sp2 * (1 / n1 + 1 / n2))
    else:
        se = math.sqrt(s1 ** 2 / n1 + s2 ** 2 / n2)
    return _r((x1 - x2) / se, nd)
def df_welch(s1, n1, s2, n2, nd=0):
    a, b = s1 ** 2 / n1, s2 ** 2 / n2
    return _r(math.floor((a + b) ** 2 / (a ** 2 / (n1 - 1) + b ** 2 / (n2 - 1))), nd)
def df_pooled(n1, n2, nd=0): return _r(n1 + n2 - 2, nd)
def p_value_2sample(x1, s1, n1, x2, s2, n2, pooled=False, nd=4):
    r = t_stat_2sample(x1, s1, n1, x2, s2, n2, pooled, nd=10)["correct"]
    df = (n1 + n2 - 2) if pooled else ((s1 ** 2 / n1 + s2 ** 2 / n2) ** 2 / ((s1 ** 2 / n1) ** 2 / (n1 - 1) + (s2 ** 2 / n2) ** 2 / (n2 - 1)))
    return _r(2 * stats.t.sf(abs(r), df), nd)
def t_stat_paired(diffs, nd=2):
    d = np.array(diffs, float); return _r(d.mean() / (d.std(ddof=1) / math.sqrt(len(d))), nd)
def t_critical(alpha, df, two_sided=True, nd=3): return _r(stats.t.ppf(1 - alpha / 2, df) if two_sided else stats.t.ppf(1 - alpha, df), nd)
def ci_mean_halfwidth(sd, n, confidence_pct=95, use_t=True, nd=2):
    a = 1 - confidence_pct / 100
    crit = stats.t.ppf(1 - a / 2, n - 1) if use_t else stats.norm.ppf(1 - a / 2)
    return _r(crit * sd / math.sqrt(n), nd)
def ci_mean_upper(xbar, sd, n, confidence_pct=95, use_t=True, nd=2): return _r(xbar + ci_mean_halfwidth(sd, n, confidence_pct, use_t, 10)["correct"], nd)
def ci_mean_lower(xbar, sd, n, confidence_pct=95, use_t=True, nd=2): return _r(xbar - ci_mean_halfwidth(sd, n, confidence_pct, use_t, 10)["correct"], nd)
def chi2_stat_variance(s2, sigma0_2, n, nd=2): return _r((n - 1) * s2 / sigma0_2, nd)
def f_stat_two_variances(s1, s2, nd=2): return _r(s1 ** 2 / s2 ** 2, nd)

# ---- ANOVA ----
def anova_f(groups, nd=2): return _r(stats.f_oneway(*groups).statistic, nd)
def anova_p(groups, nd=4): return _r(stats.f_oneway(*groups).pvalue, nd)
def anova_df_between(k, nd=0): return _r(k - 1, nd)
def anova_df_within(k, n_total, nd=0): return _r(n_total - k, nd)
def anova_ms(ss, df, nd=2): return _r(ss / df, nd)
def anova_f_from_ss(ss_between, df_between, ss_within, df_within, nd=2): return _r((ss_between / df_between) / (ss_within / df_within), nd)
def f_critical(alpha, df1, df2, nd=2): return _r(stats.f.ppf(1 - alpha, df1, df2), nd)
def anova_p_from_f(f, df1, df2, nd=4): return _r(stats.f.sf(f, df1, df2), nd)

# ---- proportions and chi-square ----
def z_stat_1prop(x, n, p0, nd=2):
    p = x / n; return _r((p - p0) / math.sqrt(p0 * (1 - p0) / n), nd)
def p_value_1prop(x, n, p0, tail="two", nd=4):
    z = z_stat_1prop(x, n, p0, 10)["correct"]
    p = 2 * stats.norm.sf(abs(z)) if tail == "two" else (stats.norm.sf(z) if tail == "greater" else stats.norm.cdf(z))
    return _r(p, nd)
def z_stat_2prop(x1, n1, x2, n2, nd=2):
    p1, p2 = x1 / n1, x2 / n2; pp_ = (x1 + x2) / (n1 + n2)
    return _r((p1 - p2) / math.sqrt(pp_ * (1 - pp_) * (1 / n1 + 1 / n2)), nd)
def p_value_2prop(x1, n1, x2, n2, nd=4):
    z = z_stat_2prop(x1, n1, x2, n2, 10)["correct"]; return _r(2 * stats.norm.sf(abs(z)), nd)
def chi2_expected(row_total, col_total, grand_total, nd=2): return _r(row_total * col_total / grand_total, nd)
def chi2_stat(table, nd=2): return _r(stats.chi2_contingency(np.array(table), correction=False).statistic, nd)
def chi2_p(table, nd=4): return _r(stats.chi2_contingency(np.array(table), correction=False).pvalue, nd)
def chi2_df(rows, cols, nd=0): return _r((rows - 1) * (cols - 1), nd)
def chi2_critical(alpha, df, nd=3): return _r(stats.chi2.ppf(1 - alpha, df), nd)
def chi2_gof_stat(observed, expected, nd=2): return _r(sum((o - e) ** 2 / e for o, e in zip(observed, expected)), nd)
def ci_prop_halfwidth(x, n, confidence_pct=95, nd=4):
    p = x / n; z = stats.norm.ppf(1 - (1 - confidence_pct / 100) / 2); return _r(z * math.sqrt(p * (1 - p) / n), nd)

# ---- non-parametric (for interpretation items needing a number) ----
def mann_whitney_p(a, b, nd=4): return _r(stats.mannwhitneyu(a, b, alternative="two-sided").pvalue, nd)
def kruskal_p(groups, nd=4): return _r(stats.kruskal(*groups).pvalue, nd)
def wilcoxon_p(a, b=None, nd=4): return _r((stats.wilcoxon(a, b) if b else stats.wilcoxon(a)).pvalue, nd)
def sign_test_p(data, median0, nd=4):
    d = np.array(data) - median0; d = d[d != 0]; k = int((d > 0).sum()); n = len(d)
    return _r(stats.binomtest(k, n, 0.5).pvalue, nd)

# ---- correlation and regression ----
def pearson_r(x, y, nd=3): return _r(stats.pearsonr(x, y)[0], nd)
def r_squared(x, y, nd=3): return _r(stats.pearsonr(x, y)[0] ** 2, nd)
def r2_from_r(r, nd=3): return _r(r ** 2, nd)
def r2_from_ss(ss_regression, ss_total, nd=3): return _r(ss_regression / ss_total, nd)
def slope(x, y, nd=3): return _r(stats.linregress(x, y).slope, nd)
def intercept(x, y, nd=3): return _r(stats.linregress(x, y).intercept, nd)
def predict(b0, b1, x, nd=2): return _r(b0 + b1 * x, nd)
def residual(observed, b0, b1, x, nd=2): return _r(observed - (b0 + b1 * x), nd)
def regression_p_slope(x, y, nd=4): return _r(stats.linregress(x, y).pvalue, nd)
def adj_r2(r2, n, k, nd=3): return _r(1 - (1 - r2) * (n - 1) / (n - k - 1), nd)

# ---- sample size ----
def n_mean(sd, margin, confidence_pct=95, nd=0):
    z = stats.norm.ppf(1 - (1 - confidence_pct / 100) / 2); return _r(math.ceil((z * sd / margin) ** 2), nd)
def n_prop(p, margin, confidence_pct=95, nd=0):
    z = stats.norm.ppf(1 - (1 - confidence_pct / 100) / 2); return _r(math.ceil(z ** 2 * p * (1 - p) / margin ** 2), nd)

# ---- SPC ----
A2 = {2: 1.880, 3: 1.023, 4: 0.729, 5: 0.577, 6: 0.483, 7: 0.419, 8: 0.373, 9: 0.337, 10: 0.308}
D3 = {2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0.076, 8: 0.136, 9: 0.184, 10: 0.223}
D4 = {2: 3.267, 3: 2.574, 4: 2.282, 5: 2.114, 6: 2.004, 7: 1.924, 8: 1.864, 9: 1.816, 10: 1.777}
A3 = {2: 2.659, 3: 1.954, 4: 1.628, 5: 1.427, 6: 1.287, 7: 1.182, 8: 1.099, 9: 1.032, 10: 0.975}
B3 = {2: 0, 3: 0, 4: 0, 5: 0, 6: 0.030, 7: 0.118, 8: 0.185, 9: 0.239, 10: 0.284}
B4 = {2: 3.267, 3: 2.568, 4: 2.266, 5: 2.089, 6: 1.970, 7: 1.882, 8: 1.815, 9: 1.761, 10: 1.716}
def imr_ucl(xbar, mrbar, nd=2): return _r(xbar + 2.66 * mrbar, nd)
def imr_lcl(xbar, mrbar, nd=2): return _r(xbar - 2.66 * mrbar, nd)
def mr_ucl(mrbar, nd=2): return _r(3.267 * mrbar, nd)
def mrbar_from_data(data, nd=3): d = np.abs(np.diff(data)); return _r(d.mean(), nd)
def sigma_from_mrbar(mrbar, nd=3): return _r(mrbar / 1.128, nd)
def sigma_from_rbar(rbar, n, nd=3):
    d2 = {2: 1.128, 3: 1.693, 4: 2.059, 5: 2.326, 6: 2.534, 7: 2.704, 8: 2.847, 9: 2.970, 10: 3.078}
    return _r(rbar / d2[n], nd)
def xbar_r_ucl(xbarbar, rbar, n, nd=2): return _r(xbarbar + A2[n] * rbar, nd)
def xbar_r_lcl(xbarbar, rbar, n, nd=2): return _r(xbarbar - A2[n] * rbar, nd)
def r_ucl(rbar, n, nd=2): return _r(D4[n] * rbar, nd)
def r_lcl(rbar, n, nd=2): return _r(D3[n] * rbar, nd)
def xbar_s_ucl(xbarbar, sbar, n, nd=2): return _r(xbarbar + A3[n] * sbar, nd)
def xbar_s_lcl(xbarbar, sbar, n, nd=2): return _r(xbarbar - A3[n] * sbar, nd)
def s_ucl(sbar, n, nd=3): return _r(B4[n] * sbar, nd)
def p_ucl(pbar, n, nd=4): return _r(min(1, pbar + 3 * math.sqrt(pbar * (1 - pbar) / n)), nd)
def p_lcl(pbar, n, nd=4): return _r(max(0, pbar - 3 * math.sqrt(pbar * (1 - pbar) / n)), nd)
def np_ucl(pbar, n, nd=2): return _r(n * pbar + 3 * math.sqrt(n * pbar * (1 - pbar)), nd)
def np_lcl(pbar, n, nd=2): return _r(max(0, n * pbar - 3 * math.sqrt(n * pbar * (1 - pbar))), nd)
def c_ucl(cbar, nd=2): return _r(cbar + 3 * math.sqrt(cbar), nd)
def c_lcl(cbar, nd=2): return _r(max(0, cbar - 3 * math.sqrt(cbar)), nd)
def u_ucl(ubar, n, nd=3): return _r(ubar + 3 * math.sqrt(ubar / n), nd)
def u_lcl(ubar, n, nd=3): return _r(max(0, ubar - 3 * math.sqrt(ubar / n)), nd)
def ewma_next(prev, x, lam, nd=3): return _r(lam * x + (1 - lam) * prev, nd)
def cusum_next(prev, x, target, k, nd=2): return _r(max(0, prev + (x - target) - k), nd)

# ---- Lean / finance arithmetic ----
def pct_change(old, new, nd=1): return _r((new - old) / old * 100, nd)
def payback_months(cost, monthly_saving, nd=1): return _r(cost / monthly_saving, nd)
def roi_pct(benefit, cost, nd=1): return _r((benefit - cost) / cost * 100, nd)
def npv(rate, cashflows, nd=0):
    """cashflows[0] at time 0 (negative for investment)."""
    return _r(sum(cf / (1 + rate) ** t for t, cf in enumerate(cashflows)), nd)
def pce_pct(value_added_time, lead_time, nd=1): return _r(value_added_time / lead_time * 100, nd)
def little_law_lead_time(wip, exit_rate, nd=2): return _r(wip / exit_rate, nd)
def oee_pct(availability, performance, quality, nd=1): return _r(availability * performance * quality * 100, nd)
def rpn(severity, occurrence, detection, nd=0): return _r(severity * occurrence * detection, nd)

# ---- classes of distributions (Day 20) ----
def poisson_prob(lam, k, nd=4): return _r(stats.poisson.pmf(k, lam), nd)
def poisson_prob_at_most(lam, k, nd=4): return _r(stats.poisson.cdf(k, lam), nd)
def binomial_prob(n, p, k, nd=4): return _r(stats.binom.pmf(k, n, p), nd)
def binomial_prob_at_most(n, p, k, nd=4): return _r(stats.binom.cdf(k, n, p), nd)
def binomial_mean(n, p, nd=2): return _r(n * p, nd)
def binomial_sd(n, p, nd=2): return _r(math.sqrt(n * p * (1 - p)), nd)
def exponential_mean(rate, nd=2): return _r(1 / rate, nd)
def exponential_survival(rate, t, nd=4): return _r(math.exp(-rate * t), nd)
def exponential_median(rate, nd=2): return _r(math.log(2) / rate, nd)
