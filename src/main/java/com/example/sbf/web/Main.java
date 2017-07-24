package com.example.sbf.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by yamataka on 7/24/17.
 */
@Controller
@RequestMapping("/")
public class Main {
    @RequestMapping(method = RequestMethod.GET)
    String index(Model model) {
        return "index";
    }
}
