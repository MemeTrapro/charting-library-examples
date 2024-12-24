console.log("test-script.js loaded successfully");

function runIfModulesAreReady() {
  if (!window.TradingView || !window.configureDatafeed) {
    return;
  }
  console.log("runIfModulesAreReady...")
  const tokenInfo = {
    createdOn: "https://pump.fun",
    decimals: 6,
    description: `It's a Meme Coin
  It's worthless?
  It is: Unicorn Fart Dust
  Prove me wrong!  I am a 54 year old (almost) boomer, 1st time crypto buyer and started this Meme Coin in 3 hours.
  I will be covering this journey here: https://www.youtube.com/channel/UC7KRV9tVt7JqaSO3t6ifAsA
  I was taught that silver and gold are the only forms of real money, everything else is Unicorn Fart Dust.  Until proven wrong (this happens often).
  Disclaimer:
  Not investment advice: The Unicorn Fart Dust Meme Coin is backed by nothing but Unicorn Fart Dust`,
    hasFileMetaData: true,
    image: "https://image.solanatracker.io/proxy?url=https%3A%2F%2Fipfs-forward.solanatracker.io%2Fipfs%2FQmSPYBXsBnoDuUctoaW8DFLmURpJZULMFWH5EEbS2Y5LQS",
    mint: "eL5fUxj2J4CiQsmW85k5FG9DvuQjjUoBHoQBi2Kpump",
    name: "Unicorn Fart Dust",
    showName: true,
    symbol: "UFD",
    uri: "https://ipfs.io/ipfs/QmSwEpRo9SRsPaFfrD65drLbusGLMY6ewRevWXF4JcWKTv"
  };

  function getTheme() {
    return "light"; // Replace with dynamic detection if needed
  }

  const timeFrames = [
    { text: "6M", resolution: "1D" },
    { text: "3M", resolution: "1D" },
    { text: "1M", resolution: "240" },
    { text: "5d", resolution: "60" },
    { text: "1d", resolution: "15" },
  ];

  const mode = getTheme();
  const loadingBg = mode === "dark" ? "#131621" : "#ffffff";
  const loadingFg = mode === "dark" ? "#ffffff" : "#000000";

  function initializeChart() {
    console.log("running initializeChart...")
    const chartContainer = document.getElementById("chart-container");
    if (!chartContainer) {
        console.error("Chart container not found!");
        return;
    } else {
      console.log("chart container found!");
    }
    
    if (typeof window.configureDatafeed === "function") {
      console.log("configureDatafeed correct -- inside intialize chart")
    } else {
      console.log("configureDatafeed incorrect -- inside intialize chart")
    }

    if (chartContainer && window.configureDatafeed) {
      console.log("Before Widget options");
      const widgetOptions = {
        symbol: tokenInfo.symbol || "?",
        datafeed: configureDatafeed(tokenInfo),
        interval: "15",
        container_id: "chart-container",
        library_path: "./",
        locale: "en",
        disabled_features: [
          "header_symbol_search",
          "symbol_search_hot_key",
          "header_screenshot",
          "header_saveload",
          "header_compare",
          "header_chart_type",
          "display_market_status",
          "volume_force_overlay",
          "popup_hints",
          "use_localstorage_for_settings",
          "symbol_info",
          "header_undo_redo",
          "go_to_date",
        ],
        enabled_features: ["pane_context_menu", "left_toolbar"],
        fullscreen: false,
        autosize: true,
        theme: mode === "dark" ? "Dark" : "Light",
        loading_screen: { backgroundColor: loadingBg, foregroundColor: loadingFg },
        time_frames: timeFrames,
      };
      const tvWidget = new window.TradingView.widget(widgetOptions);
      console.log('After widget');
      tvWidget._innerWindow().console.log = window.console.log;
      tvWidget._innerWindow().console.error = window.console.error;
      tvWidget._innerWindow().onerror = window.onerror;
      
      console.log('window: ' + document.documentElement.outerHTML);
      console.log('widget window: ' + tvWidget._innerWindow().document.documentElement.outerHTML);

      window.addEventListener("beforeunload", () => {
        if (tvWidget) tvWidget.remove();
      });
    } else {
      console.error("configureDatafeed is not defined!");
    }
  }
  initializeChart();
}

import('./charting_library.js').then((module) => {
  console.log("charting_libarary ready");
  window.TradingView = module;
  runIfModulesAreReady();
})

import('./streaming.js').then(() => {
  console.log('streaming ready');
  import('./datafeed.js').then(() => {
    console.log("datafeed ready");
    runIfModulesAreReady();
  })
})
