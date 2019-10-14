package com.basf.test.gfaller.chatbot.gui.custom.component;

import com.vaadin.flow.component.ClickNotifier;
import com.vaadin.flow.component.HtmlContainer;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.html.Span;

@Tag("p")
public class P extends HtmlContainer implements ClickNotifier<Span> {

    public P(String s) {
        getElement().setText(s);
    }
}