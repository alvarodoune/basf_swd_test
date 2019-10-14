package com.basf.test.gfaller.chatbot.gui.view.main.component;

import com.basf.test.gfaller.chatbot.gui.custom.component.MyButton;
import com.basf.test.gfaller.chatbot.gui.view.main.MainView;
import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.KeyPressEvent;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoginComponent extends Div {

    private static final Logger LOG = LoggerFactory.getLogger(LoginComponent.class);

    private final transient MainView parent;
    private final TextField tfName;

    public LoginComponent(final MainView parent) {
        this.parent = parent;

        final var verticalLayout = new VerticalLayout();
        verticalLayout.setDefaultHorizontalComponentAlignment(FlexComponent.Alignment.CENTER);

        tfName = new TextField();
        tfName.setId("name");
        tfName.setLabel("Who are you? ");
        tfName.addKeyPressListener(this::enterKey);

        final MyButton btnEnter = new MyButton("is my name", this::onClick);
        verticalLayout.add(tfName, btnEnter);

        add(verticalLayout);
    }

    private void enterKey(final KeyPressEvent keyPressEvent) {
        final var key = keyPressEvent.getKey();

        if ("[Enter]".equals(key.getKeys().toString())) {
            LOG.info("Enter: {}", tfName.getValue());
            parent.login(tfName.getValue());
        }
    }

    private void onClick(final ClickEvent<Button> clickEvent) {
        LOG.info("Click: {}", tfName.getValue());
        parent.login(tfName.getValue());
    }

}
