package com.basf.test.gfaller.chatbot.gui.template;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.html.Header;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.server.StreamResource;


public class MyHeader extends Composite<Header> {

    public MyHeader() {
        final Header content = getContent();
        content.add(
                getMenu()
        );
    }


    private Component getMenu() {
        return new HorizontalLayout(getImg());
    }

    private Image getImg() {
        StreamResource sr = new StreamResource("Banner", () -> MyHeader.class.getClassLoader().getResourceAsStream("images/logo.png"));
        final Image img = new Image(sr, "BASF");

        img.addClassName("hide-on-mobile");
        img.addClassName("banner-img");
        return img;
    }

}
