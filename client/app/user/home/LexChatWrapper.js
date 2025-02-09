"use client"; // Ensure this runs on the client-side

import React, { useEffect } from "react";

const LexChatWrapper = () => {
  useEffect(() => {
    const scriptId = "lex-chatbot-script"; // Prevent duplicate script insertion

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://d3q9907jwkcy1u.cloudfront.net/lex-web-ui-loader.min.js";
      script.async = true;

      script.onload = () => {
        const loaderOpts = {
          baseUrl: "https://d3q9907jwkcy1u.cloudfront.net/",
          shouldLoadMinDeps: true,
        };

        const loader = new window.ChatBotUiLoader.IframeLoader(loaderOpts); // Chatbot configuration

        const chatbotUiConfig = {
          region: "us-east-1",
          cognito: {
            poolId: "us-east-1:1a2bc86e-4261-4e08-b52f-0a33340af8e3",
            appUserPoolClientId: "5luv9gubpksnf3dflbt2e7adf6",
            appUserPoolName: "us-east-1_at9VQU44E",
            appDomainName:
              "lexkwebkuikidentitypoolconfigkjigdqbflftdj559050250551.auth.us-east-1.amazoncognito.com",
            aws_cognito_region: "us-east-1",
          },
          lex: {
            v2BotId: "WV9CNETBXA",
            v2BotAliasId: "VPFWRH8R2P",
            v2BotLocaleId: "en_US",
            botName: "WV9CNETBXA",
            botAlias: "$LATEST",
            initialText:
              "You can ask me more about the news! Simply Type into the Chatbox",
            initialSpeechInstruction: "Test",
          },
          ui: {
            parentOrigin: "http://localhost:3000",
            toolbarTitle: "News Research",
            enableLogin: false,
            enableLiveChat: false,
            AllowSuperDangerousHTMLInMessage: true,
            toolbarColor: "#1e3a8a",
            messageBackgroundColor: "2563eb",
          },
          iframe: {
            iframeOrigin: "https://d3q9907jwkcy1u.cloudfront.net",
            shouldLoadIframeMinimized: false,
            iframeSrcPath: "/index.html#/?lexWebUiEmbed=true",
          },
        }; // Load the chatbot

        loader.load(chatbotUiConfig).catch((error) => {
          console.error("Chatbot UI failed to load", error);
        });
      };

      document.body.appendChild(script);
    }

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);
};

export default LexChatWrapper;
