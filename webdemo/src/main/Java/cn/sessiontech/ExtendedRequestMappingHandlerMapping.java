package cn.sessiontech;

import java.lang.reflect.Method;

import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

 
 
public class ExtendedRequestMappingHandlerMapping extends RequestMappingHandlerMapping {

    protected RequestMappingInfo getMappingForMethod(Method method, Class<?> handlerType) {
        RequestMappingInfo info;
       /* System.out.println(handlerType.getName()+";"+handlerType.getAnnotations().length+";"+handlerType.isAnnotationPresent(Api.class) 
        +";"+AnnotationMethodNameController.class.isAnnotationPresent(Api.class)
        +";"+handlerType.getClass().isAnnotationPresent(Api.class)
        +";"+method.isAnnotationPresent(Api.class)
        +";"+(method.getAnnotations().length>0?method.getAnnotations()[0].toString():"0")
        +";"+method.getAnnotations().length
        +"-----------------------------------------:"+method.getName()
        +handlerType.getName()+"oooooooo"+handlerType.toString()
        +handlerType.getClass().getName() +"oooooooo"+handlerType.getClass().toString()
        );*/
        if ((handlerType.getClass().isAnnotationPresent(Api.class)
        		&&  handlerType.getClass().getAnnotation(Api.class).isAutoConfig())
        		||method.getName().startsWith("test")) {
            info = createRequestMappingInfoByMethodName(method);
        }
        else {
            info = super.getMappingForMethod(method, handlerType);
        }
        return info;
    }

    protected RequestMappingInfo createRequestMappingInfoByMethodName(Method method) {
        RequestMapping requestMapping = AnnotatedElementUtils.findMergedAnnotation(method.getDeclaringClass(),
        		RequestMapping.class);
        String path = requestMapping.value()[0] + "/" + method.getName();
        return RequestMappingInfo
                .paths(path)
                .methods(requestMapping.method())
                .params(requestMapping.params())
                .headers(requestMapping.headers())
                .consumes(requestMapping.consumes())
                .produces(requestMapping.produces())
                .mappingName(requestMapping.name())
                .build();
    }
}
