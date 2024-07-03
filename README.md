function xirr(cashflows, guess = 0.1) {
    const tol = 1e-6;
    const maxIter = 1000;
    
    function xnpv(rate) {
        let xnpv = 0;
        const start = new Date(cashflows[0].date);
        for (const cashflow of cashflows) {
            const date = new Date(cashflow.date);
            const days = (date - start) / (1000 * 60 * 60 * 24);
            xnpv += cashflow.amount / Math.pow(1 + rate, days / 365);
        }
        return xnpv;
    }

    function dxnpv(rate) {
        let dxnpv = 0;
        const start = new Date(cashflows[0].date);
        for (const cashflow of cashflows) {
            const date = new Date(cashflow.date);
            const days = (date - start) / (1000 * 60 * 60 * 24);
            dxnpv -= (days / 365) * cashflow.amount / Math.pow(1 + rate, (days / 365) + 1);
        }
        return dxnpv;
    }

    let rate = guess;
    for (let i = 0; i < maxIter; i++) {
        const xnpvVal = xnpv(rate);
        const dxnpvVal = dxnpv(rate);
        const newRate = rate - xnpvVal / dxnpvVal;
        if (Math.abs(newRate - rate) < tol) {
            return newRate;
        }
        rate = newRate;
    }
    
    throw new Error("XIRR calculation did not converge");
}

const cashflows = [
    { amount: -100000, date: '2022-10-15' },
    { amount: 102000, date: '2022-10-18' },
    { amount: -100000, date: '2022-10-18' },
    { amount: 100200, date: '2022-10-20' },

];

const result = xirr(cashflows);
console.log('XIRR:', result);