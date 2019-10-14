package com.basf.test.gfaller.chatbot.service;

import com.basf.test.gfaller.chatbot.persistence.Message;
import com.basf.test.gfaller.chatbot.persistence.User;
import com.basf.test.gfaller.chatbot.persistence.dao.MessageRepository;
import com.basf.test.gfaller.chatbot.persistence.dao.UserRepository;
import com.basf.test.gfaller.chatbot.watson.WatsonConnector;
import com.basf.test.gfaller.chatbot.watson.WatsonException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BusinessLayer {

    private static final WatsonConnector watsonConnector = new WatsonConnector();

    @Autowired
    private UserRepository users;

    @Autowired
    private MessageRepository messages;

    public User login(final String name) {
        final Optional<User> userOpt = users.findById(name);
        final User user = userOpt.orElse(new User(name));
        final String session = watsonConnector.getSession();
        user.setSessionKey(session);

        users.save(user);

        return user;
    }

    public Message sendMessage(final User user, final String text) {
        final Message send = Message.send(text, user);
        messages.save(send);
        return send;
    }

    public Message receiveMessage(final User user, final String text) {
        String response;
        try {
            response = watsonConnector.sendMessage(text, user.getSessionKey());
        } catch (WatsonException e) {
            response = "Error: " + e.getMessage();

            user.setSessionKey(null);
            users.save(user);
        }
        final Message received = Message.receive(response, user);

        messages.save(received);
        return received;
    }

    public List<Message> getMessages(final User user) {
        return messages.findAllByUser(user);
    }

}
