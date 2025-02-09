import { useEffect, useRef } from "react";

const LexChatWrapper = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const scriptId = "lex-chatbot-script";

    // Check if the script is already added
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src =
      "https://d3q9907jwkcy1u.cloudfront.net/lex-web-ui-loader.min.js";
    script.async = true;

    script.onload = () => {
      console.log("Chatbot script loaded successfully");

      const loaderOpts = {
        baseUrl: "https://d3q9907jwkcy1u.cloudfront.net/",
        shouldLoadMinDeps: true,
      };

      const loader = new window.ChatBotUiLoader.IframeLoader(loaderOpts);

      const chatbotUiConfig = {
        region: "us-east-1",
        cognito: {
          poolId: "us-east-1:1a2bc86e-4261-4e08-b52f-0a33340af8e3",
        },
        lex: {
          v2BotId: "WV9CNETBXA",
          v2BotAliasId: "VPFWRH8R2P",
          v2BotLocaleId: "en_US",
          initialText:
            "You can ask me more about the news! Simply type into the chatbox.",
          initialSpeechInstruction: "Test",
        },
        ui: {
          parentOrigin: window.location.origin,
          toolbarTitle: "News Research",
          enableLogin: false,
          enableLiveChat: false,
          AllowSuperDangerousHTMLInMessage: true,
          hideButtonMessageBubble: true,
          toolbarColor: "#1e3a8a",
          backgroundColor: "#1e3a8a",
          headerColor: "#1e3a8a",
          messageBackgroundColor: "#2563eb",
          messageFontColor: "#ffffff",
          inputFontColor: "#ffffff",
          inputBackgroundColor: "#3b82f6",
          buttonColor: "#60a5fa",
          buttonFontColor: "#ffffff",
        },
        iframe: {
          iframeOrigin: "https://d3q9907jwkcy1u.cloudfront.net",
          shouldLoadIframeMinimized: false,
          iframeSrcPath: "/index.html#/?lexWebUiEmbed=true",
        },
      };

      loader
        .load(chatbotUiConfig)
        .then(() => {
          console.log("Chatbot UI successfully loaded!");
        })
        .catch((error) => {
          console.error("Chatbot UI failed to load:", error);
        });
    };

    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return <div id="lex-web-ui" className="w-full h-full" />;
};

export default LexChatWrapper;
