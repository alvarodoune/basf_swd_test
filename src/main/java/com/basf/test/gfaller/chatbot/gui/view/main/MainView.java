package com.basf.test.gfaller.chatbot.gui.view.main;

import com.basf.test.gfaller.chatbot.Application;
import com.basf.test.gfaller.chatbot.gui.config.SessionService;
import com.basf.test.gfaller.chatbot.gui.template.Main;
import com.basf.test.gfaller.chatbot.gui.view.main.component.ChatComponent;
import com.basf.test.gfaller.chatbot.gui.view.main.component.LoginComponent;
import com.basf.test.gfaller.chatbot.persistence.Message;
import com.basf.test.gfaller.chatbot.persistence.User;
import com.basf.test.gfaller.chatbot.service.BusinessLayer;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Route(value = "", layout = Main.class)
public class MainView extends Composite<Div> {

    private final transient SessionService session;

    private final transient BusinessLayer business;

    private final transient UI current;

    public MainView(@Autowired SessionService bean, @Autowired BusinessLayer business) {
        this.session = bean;
        this.business = business;
        this.current = UI.getCurrent();

        final Div content = getContent();
        content.setClassName("text-view");

        if (bean.inited()) {
            add(new ChatComponent(this));
        } else {
            add(new LoginComponent(this));
        }

    }

    public final void add(Component... components) {
        getContent().add(components);
    }

    public final void removeAll() {
        getContent().removeAll();
    }

    public SessionService getSession() {
        return session;
    }

    public void login(final String name) {
        removeAll();
        businessLogin(name, () -> current.access(() -> add(new ChatComponent(this))));
    }

    public void businessLogin(final String name) {
        businessLogin(name, null);
    }

    public void businessLogin(final String name, final Runnable afterSuccess) {
        Application.async(() -> {
            final User loggedUser = business.login(name);
            session.setUser(loggedUser);
            if (afterSuccess != null) {
                afterSuccess.run();
            }
        });
    }

    /**
     * The session will be refreshed if the sessionKey is null
     */
    public void refreshSession() {
        final var user = session.getUser();
        if (user.getSessionKey() == null) {
            businessLogin(user.getName());
        }
    }

    public Message sendMessage(final String message) {
        return business.sendMessage(session.getUser(), message);
    }

    public Message receiveMessage(final String message) {
        return business.receiveMessage(session.getUser(), message);
    }

    public List<Message> getMessages() {
        return business.getMessages(session.getUser());
    }
}