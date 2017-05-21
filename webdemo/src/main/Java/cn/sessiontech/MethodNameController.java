package cn.sessiontech;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
@RequestMapping("/common")
public class MethodNameController {

	public String test() {
  	  System.out.println("/default-test");
  	return "test";
  }
  
  @RequestMapping("/test999.do")
  public String test11() {
      System.out.println("/test");
  	return "test999";
  }
  
  public String test2() {
  	  System.out.println("/default-test2");
      return "test2";
  }
}