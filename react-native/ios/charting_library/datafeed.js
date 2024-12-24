const lastBarsCache = new Map();

// map resolution to interval used by api
const resolutionMapping = {
    '1': '1m',
    '5': '5m',
    '15': '15m',
    '30': '30m',
    '60': '1h',
    '240': '4h',
    '720': '12h',
    '1D': '1d',
    '1W': '1w',
    '1M': '1mn',
};
// DatafeedConfiguration implementation
const configurationData = {
    // Represents the resolutions for bars supported by your datafeed
    supported_resolutions: ['1', '5', '15', '30', '60', '240', '720', '1D', '1W', '1M'],
    // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
    exchanges: [{ value: '', name: 'All Exchanges', desc: '' }],
    // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
    symbols_types: [{ name: 'crypto', value: 'crypto' }],
};

console.log("define configureDatafeed!!!!!!!!!!!")
const configureDatafeed = (tokneInfo) => {

    return {
        onReady: (callback) => {
            console.log('[onReady]: Method call');
            setTimeout(() => callback(configurationData));
        },

        searchSymbols: async (
            userInput,
            exchange,
            symbolType,
            onResultReadyCallback,
        ) => {
            console.log('[searchSymbols]: Method call');
            onResultReadyCallback([]);
        },

        resolveSymbol: async (
            symbolName,
            onSymbolResolvedCallback,
            onResolveErrorCallback,
            extension
        ) => {
            console.log('[resolveSymbol]: Method call', symbolName);
            console.log('[resolveSymbol]: tokneInfo', tokneInfo)

            // Symbol information object
            const symbolInfo = {
                ticker: tokneInfo.symbol || '',
                name: tokneInfo.symbol || '',
                description: '', // tokneInfo.description,
                type: "crypto",
                session: '24x7',
                timezone: 'Etc/UTC',
                exchange: "",
                minmov: 1,
                pricescale: 1000000,
                has_intraday: true,
                has_weekly_and_monthly: false,
                supported_resolutions: configurationData.supported_resolutions,
                volume_precision: 2,
                data_status: 'streaming',
            };

            console.log('[resolveSymbol]: Symbol resolved', symbolName);
            setTimeout(() => onSymbolResolvedCallback(symbolInfo));

        },

        getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
            console.log('[getBars]: Method call', symbolInfo, resolution, periodParams);
            const { from, to, firstDataRequest } = periodParams;
            const tokenAddress = tokneInfo.mint;
            const interval = resolutionMapping[resolution];

            try {
                // const data = await api.get(`/stp/chart/${tokenAddress}?type=${interval}&time_from=${from}&time_to=${to}`);
                const data = {"oclhv":[{"open":0.11753155645516657,"close":0.11753155645516657,"low":0.11640806048984764,"high":0.13032576016054231,"volume":2167202.8269210067,"time":1734686100},{"open":0.11753155645516657,"close":0.12459893619006604,"low":0.11753155645516657,"high":0.13807792749184514,"volume":1975656.7230825098,"time":1734687000},{"open":0.12459893619006604,"close":0.11864739527029985,"low":0.10592410784318634,"high":0.12459893619006604,"volume":2610816.050594185,"time":1734687900},{"open":0.11864739527029985,"close":0.10656919436137989,"low":0.09743326807154343,"high":0.11864739527029985,"volume":3196024.243786026,"time":1734688800},{"open":0.10656919436137989,"close":0.10275720947187969,"low":0.09518144882661385,"high":0.10656919436137989,"volume":3228474.2842902327,"time":1734689700},{"open":0.10275720947187969,"close":0.10316160865487814,"low":0.10275720947187969,"high":0.12236119622884659,"volume":4035544.802541277,"time":1734690600},{"open":0.10316160865487814,"close":0.11703991200933826,"low":0.10316160865487814,"high":0.11846022186720227,"volume":1790974.8698279187,"time":1734691500},{"open":0.11703991200933826,"close":0.1135053118623259,"low":0.1008731439632292,"high":0.11703991200933826,"volume":2253435.8938081334,"time":1734692400},{"open":0.1135053118623259,"close":0.10698663920574505,"low":0.09662648564850719,"high":0.1135053118623259,"volume":2219455.9142903723,"time":1734693300},{"open":0.10698663920574505,"close":0.10190560897272667,"low":0.08901021072821232,"high":0.10698663920574505,"volume":4348328.263533311,"time":1734694200},{"open":0.10190560897272667,"close":0.09272780306998804,"low":0.08769712131428428,"high":0.17971135068354224,"volume":3839741.9682552577,"time":1734695100},{"open":0.09272780306998804,"close":0.09647731396638531,"low":0.08111771161739507,"high":0.09762291105989565,"volume":4605216.083783126,"time":1734696000},{"open":0.09647731396638531,"close":0.085008510636202,"low":0.0756020889706509,"high":0.09647731396638531,"volume":4605013.317974345,"time":1734696900},{"open":0.085008510636202,"close":0.08057842701459679,"low":0.0783252514691198,"high":0.09139760912142504,"volume":1852322.7045621807,"time":1734697800},{"open":0.08057842701459679,"close":0.08821204226328166,"low":0.07769299088331694,"high":0.09606796511447423,"volume":3712293.7617065352,"time":1734698700},{"open":0.08821204226328166,"close":0.0793405634766678,"low":0.0755497439519455,"high":0.08836961349071845,"volume":2755259.718847861,"time":1734699600},{"open":0.0793405634766678,"close":0.08780562867969724,"low":0.0793405634766678,"high":0.08975638135447211,"volume":2261841.9422140964,"time":1734700500},{"open":0.08780562867969724,"close":0.08900018501472025,"low":0.08780562867969724,"high":0.10863299081068911,"volume":4548217.066203538,"time":1734701400},{"open":0.08900018501472025,"close":0.10343157724585626,"low":0.08900018501472025,"high":0.1102209173002901,"volume":2899755.05860281,"time":1734702300},{"open":0.10343157724585626,"close":0.09372432096231456,"low":0.07870918067844904,"high":0.10343157724585626,"volume":2890526.1712475372,"time":1734703200},{"open":0.09372432096231456,"close":0.09146636615377819,"low":0.08845716788623323,"high":0.09765166588183603,"volume":1981542.9492502804,"time":1734704100},{"open":0.09146636615377819,"close":0.09676520916342178,"low":0.09146636615377819,"high":0.11044811371320445,"volume":2478016.4941591136,"time":1734705000},{"open":0.09676520916342178,"close":0.09996472898778933,"low":0.09676520916342178,"high":0.11191881315949243,"volume":2257610.4120267583,"time":1734705900},{"open":0.09996472898778933,"close":0.11027754305440116,"low":0.09996472898778933,"high":0.12891162960306396,"volume":4644040.16453025,"time":1734706800},{"open":0.11027754305440116,"close":0.11860464356155469,"low":0.11027754305440116,"high":0.12876346229709268,"volume":5516295.523879689,"time":1734707700},{"open":0.11860464356155469,"close":0.1225745553182615,"low":0.11494838460894714,"high":0.13357463166941103,"volume":2138072.0911147534,"time":1734708600},{"open":0.1225745553182615,"close":0.12052559775256855,"low":0.11846135807541738,"high":0.12354057022865012,"volume":1502169.3933716074,"time":1734709500}]}

                if (data.oclhv && data.oclhv.length > 0) {
                    const bars = data.oclhv.map((item) => ({
                        time: item.time * 1000, // Convert to milliseconds
                        open: item.open,
                        high: item.high,
                        low: item.low,
                        close: item.close,
                        volume: item.volume
                    }));

                    if (firstDataRequest) {
                        lastBarsCache.set(symbolInfo.full_name, {
                            ...bars[bars.length - 1],
                        });
                    }

                    onHistoryCallback(bars, { noData: false });
                } else {
                    onHistoryCallback([], { noData: true });
                }
            } catch (error) {
                console.log('[getBars]: Get error', error);
                onErrorCallback(error);
            }
        },

        subscribeBars: (
            symbolInfo,
            resolution,
            onRealtimeCallback,
            subscriberUID,
            onResetCacheNeededCallback,
        ) => {
            console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
            window.subscribeOnStream(
                symbolInfo,
                resolution,
                onRealtimeCallback,
                subscriberUID,
                onResetCacheNeededCallback,
                lastBarsCache.get(symbolInfo.full_name),
            );
        },

        unsubscribeBars: (subscriberUID) => {
            console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
            window.unsubscribeFromStream(subscriberUID);
        },
    }
};

window.configureDatafeed = configureDatafeed;
