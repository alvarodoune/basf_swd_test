package com.basf.test.gfaller.chatbot.persistence.dao;

import com.basf.test.gfaller.chatbot.persistence.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

}
