package cn.sessiontech;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy; 
@Retention(RetentionPolicy.RUNTIME)  
public @interface Api {
   boolean isAutoConfig() default true;
}
