package com.basf.test.gfaller.chatbot.gui.view.main.component;

import com.basf.test.gfaller.chatbot.Application;
import com.basf.test.gfaller.chatbot.gui.custom.component.MyButton;
import com.basf.test.gfaller.chatbot.gui.view.main.MainView;
import com.basf.test.gfaller.chatbot.persistence.Message;
import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.KeyPressEvent;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.textfield.TextField;


public class ChatDialog extends Dialog {

    private final Div panelStory;
    private final TextField tfMessage;
    private final MyButton sendBtn;
    private final MainView parent;

    private final UI current;

    public ChatDialog(final MainView parent) {
        this.parent = parent;

        current = UI.getCurrent();

        setCloseOnEsc(true);
        setCloseOnOutsideClick(false);

        panelStory = new Div();
        panelStory.setClassName("chat-panel");

        tfMessage = new TextField();
        tfMessage.getElement().getStyle().set("margin-right", "5px");
        tfMessage.getElement().getStyle().set("width", "calc(100% - 45px)");
        tfMessage.addKeyPressListener(this::enterKey);
        tfMessage.setPlaceholder("Your Message");

        sendBtn = new MyButton("", VaadinIcon.ARROW_RIGHT.create(), this::onClick);
        sendBtn.setWidth("40px");

        add(panelStory, tfMessage, sendBtn);

        populatePanel();
        open();
    }

    private void populatePanel() {
        for (Message message : parent.getMessages()) {
            addMsgToPanel(message);
        }
    }

    private void addMsgToPanel(final Message message) {
        panelStory.add(new MessageComponent(message));
        current.getPage().executeJs(getJsScrollToBottom());

    }

    private void sendMsg() {
        final String text = tfMessage.getValue();
        tfMessage.setValue("");

        //Avoid empty msg
        if (text == null || text.trim().isEmpty()) {
            return;
        }

        final Message message = parent.sendMessage(text);
        addMsgToPanel(message);

        Application.async(() -> {
            final Message messageReceived = parent.receiveMessage(text);
            current.access(() -> addMsgToPanel(messageReceived));
        });
    }

    private void onClick(final ClickEvent<Button> clickEvent) {
        sendMsg();
    }

    private void enterKey(final KeyPressEvent keyPressEvent) {
        final var key = keyPressEvent.getKey();

        if ("[Enter]".equals(key.getKeys().toString())) {
            sendMsg();
        }
    }

    private String getJsScrollToBottom() {
        return "var panel=document.getElementsByClassName(\"chat-panel\")[0];" +
                "panel.scrollTop = panel.scrollHeight;";
    }
}
