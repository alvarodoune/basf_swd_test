package com.basf.test.gfaller.chatbot.gui.view.main.component;

import com.basf.test.gfaller.chatbot.gui.custom.component.MyButton;
import com.basf.test.gfaller.chatbot.gui.view.main.MainView;
import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.icon.VaadinIcon;

public class ChatComponent extends Div {

    private final transient MainView parent;

    public ChatComponent(final MainView parent) {
        this.parent = parent;
        add(new H2("Welcome " + parent.getSession().getUser().getName()));
        add(new MyButton("Let's talk ", VaadinIcon.MEGAFONE.create(), this::onClick));

    }

    private void onClick(final ClickEvent<Button> clickEvent) {
        parent.refreshSession();
        new ChatDialog(parent);
    }

}
