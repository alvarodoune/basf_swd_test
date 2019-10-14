package com.basf.test.gfaller.chatbot.watson;

public class WatsonException extends Exception {
    public WatsonException() {
    }

    public WatsonException(String message) {
        super(message);
    }

    public WatsonException(String message, Throwable cause) {
        super(message, cause);
    }

    public WatsonException(Throwable cause) {
        super(cause);
    }

    public WatsonException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
