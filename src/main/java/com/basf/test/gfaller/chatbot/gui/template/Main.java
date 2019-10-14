package com.basf.test.gfaller.chatbot.gui.template;

import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.router.RouterLayout;

@Push
public class Main extends Composite<Div> implements RouterLayout {

    public Main() {
        UI.getCurrent().getPage().addStyleSheet("styles/styles.css");
        UI.getCurrent().getPage().addStyleSheet("https://fonts.googleapis.com/css?family=Palanquin:300,400,500,600,700");

        final Div content = getContent();

        content.setClassName("main-component");
        content.add(new MyHeader());
        content.add(new MyFooter());
    }
}