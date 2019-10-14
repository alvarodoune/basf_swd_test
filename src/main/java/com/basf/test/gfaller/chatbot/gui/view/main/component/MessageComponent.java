package com.basf.test.gfaller.chatbot.gui.view.main.component;

import com.basf.test.gfaller.chatbot.gui.custom.component.Br;
import com.basf.test.gfaller.chatbot.persistence.Message;
import com.vaadin.flow.component.html.Div;

import java.text.SimpleDateFormat;

public class MessageComponent extends Div {

    private final transient Message message;

    public MessageComponent(final Message message) {
        this.message = message;

        setClassName("chat-message");
        final Div container = initContainer();

        container.add(textDiv());
        container.add(dateDiv());

        add(container, Br.get());
    }

    private Div initContainer() {
        final Div container = new Div();
        container.addClassName("chat-container");
        if (message.isSend()) {
            container.addClassName("pull-left");
        } else {
            container.addClassName("pull-right");
        }

        return container;
    }

    private Div textDiv() {
        final Div text = new Div();
        text.setText(message.getText());
        text.setClassName("chat-text");
        return text;
    }

    private Div dateDiv() {
        final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");

        final Div date = new Div();
        date.setText(sdf.format(message.getTimeStamp()));
        date.setClassName("chat-date");
        return date;
    }
}
