package com.basf.test.gfaller.chatbot.gui.custom.component;

import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.button.Button;

public class MyButton extends Button {

    public MyButton(String text, ComponentEventListener<ClickEvent<Button>> clickListener) {
        this(text, null, clickListener);
    }

    public MyButton(String text, Component icon, ComponentEventListener<ClickEvent<Button>> clickListener) {
        this.setClassName("my-button");
        this.setText(text);
        this.setIcon(icon);
        this.addClickListener(clickListener);
    }

    public void setDescription(String description) {
        this.getElement().setProperty("title", description);
    }
}
