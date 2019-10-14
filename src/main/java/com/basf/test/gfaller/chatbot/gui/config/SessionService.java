package com.basf.test.gfaller.chatbot.gui.config;

import com.basf.test.gfaller.chatbot.persistence.User;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.spring.annotation.VaadinSessionScope;
import org.springframework.stereotype.Component;

@VaadinSessionScope
@Component
public class SessionService {

    private User user = null;

    public void invalidate() {
        UI.getCurrent().getSession().getSession().invalidate();
        UI.getCurrent().getPage().reload();
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean inited() {
        return user != null;
    }

}
