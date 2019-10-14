package com.basf.test.gfaller.chatbot.watson;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Base64;

public final class WatsonConnector {

    private static final Logger LOG = LoggerFactory.getLogger(WatsonConnector.class);

    private static final String URL_PREFIX = "https://gateway-lon.watsonplatform.net/assistant/api/v2";
    private static final String URL_SESSION = "/assistants/{}/sessions";
    private static final String URL_MESSAGE = "/{}/message";
    private static final String URL_POSTFIX = "?version=2019-02-28";

    private final String assistantId;
    private final String apiToken;
    private final String authorization;

    public WatsonConnector() {
        this("efIGSPM2egVLwidwUGAqJaMafdj3fbkAhdcZ9z8Cg-Fc", "62a85bcf-487e-4f42-a3bc-cea06fe818c3");
    }

    public WatsonConnector(final String apiToken, final String assistantId) {
        this.assistantId = assistantId;
        this.apiToken = apiToken;
        this.authorization = generateBasicAuth(this.apiToken);
    }

    private static String generateBasicAuth(final String apiToken) {
        final String tmp = "apikey:" + apiToken;
        return Base64.getEncoder().encodeToString(tmp.getBytes());
    }

    private String getUrlSession() {
        return URL_PREFIX + URL_SESSION.replace("{}", this.assistantId) + URL_POSTFIX;
    }

    private String getUrlMessage(final String sessionId) {
        return URL_PREFIX + URL_SESSION.replace("{}", this.assistantId) + URL_MESSAGE.replace("{}", sessionId) + URL_POSTFIX;
    }

    private String auxConnector(final String url, final String body) {
        try {
            final HttpClient client = HttpClient.newHttpClient();
            final HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofMinutes(1))
                    .header("apikey", this.apiToken)
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Basic " + this.authorization)
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            final HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();
        } catch (IOException e) {
            LOG.error(e.getMessage(), e);
        } catch (InterruptedException e) {
            LOG.error("InterruptedException", e);
            Thread.currentThread().interrupt();
        }
        return null;
    }

    public String getSession() {
        final String bodyResponse = auxConnector(getUrlSession(), "");
        final JSONObject responseObj = new JSONObject(bodyResponse);
        return responseObj.getString("session_id");
    }

    public String sendMessage(final String message, final String sessionId) throws WatsonException {

        final JSONObject textObj = new JSONObject();
        textObj.put("text", message);
        final JSONObject inputObj = new JSONObject();
        inputObj.put("input", textObj);
        final String payload = inputObj.toString();

        final String bodyResponse = auxConnector(getUrlMessage(sessionId), payload);

        final JSONObject responseObj = new JSONObject(bodyResponse);
        //check expired session
        final String error = responseObj.optString("error");

        if (error != null && !error.isEmpty()) {
            LOG.warn("Session expired: {}", error);
            throw new WatsonException(error);
        }

        final var output = (JSONObject) responseObj.get("output");
        //TIP: Puedo asumir que siempre voy a recibir generic
        final var generic = (JSONArray) output.get("generic");
        final var generic0 = (JSONObject) generic.get(0);
        return generic0.getString("text");
    }

}
