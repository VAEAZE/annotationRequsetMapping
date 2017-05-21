package cn.sessiontech;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
@RequestMapping("/annotationMethodName")
@Controller
@Api(isAutoConfig=true)
public class AnnotationMethodNameController {
	@Api(isAutoConfig=true)
	   public String a() {
		  	  System.out.println("/default-a");
		  	return "a";
		  }
		  
		  @RequestMapping("/b.do")
		  public String b() {
		      System.out.println("/b");
		  	return "b";
		  }
		  
		  public String c() {
		  	  System.out.println("/default-c");
		      return "c";
		  }
}