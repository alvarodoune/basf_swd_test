package com.basf.test.gfaller.chatbot.gui.custom.component;

import com.vaadin.flow.component.ClickNotifier;
import com.vaadin.flow.component.HtmlContainer;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.html.Span;

@Tag("br")
public class Br extends HtmlContainer implements ClickNotifier<Span> {

    public static Br get() {
        return new Br();
    }

    public Br() {
        // Vaadin generates br html tag
    }
}