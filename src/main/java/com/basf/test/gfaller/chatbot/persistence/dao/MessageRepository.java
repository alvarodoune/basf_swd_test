package com.basf.test.gfaller.chatbot.persistence.dao;

import com.basf.test.gfaller.chatbot.persistence.Message;
import com.basf.test.gfaller.chatbot.persistence.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends CrudRepository<Message, String> {

    List<Message> findAllByUser(User u);
}
