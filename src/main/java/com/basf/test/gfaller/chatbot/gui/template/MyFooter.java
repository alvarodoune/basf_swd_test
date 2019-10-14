package com.basf.test.gfaller.chatbot.gui.template;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Footer;
import com.vaadin.flow.component.html.Span;

public class MyFooter extends Composite<Footer> {


    public MyFooter() {
        final Footer content = getContent();

        content.add(getTitle());
        content.add(getAuthor());
    }

    private Component getTitle() {
        return new Div(new Span("Test Chatbot - BASF 2019"));
    }

    private Component getAuthor() {
        final Div div = new Div(new Span("Germán Faller"));
        div.addClassName("pull-right");
        return div;
    }

}
