package com.javaproject.socialblog.springboot.security.jwt;

import com.javaproject.socialblog.springboot.security.service.Impl.UserDetailsServiceImpl;
import com.javaproject.socialblog.springboot.security.utils.SecurityConstants;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenManager jwtTokenManager;

    private final UserDetailsServiceImpl userDetailsService;

//    private final UserService userService;
//
//    private static final Map<String, List<String>> WHITE_LIST_API = Map.of(
//            "/bookmarks/post", Arrays.asList("POST"),
//            "/another-protected-api", Arrays.asList("GET"),
//            "/yet-another-api", Arrays.asList("DELETE")
//    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        final String header = request.getHeader(SecurityConstants.HEADER_STRING);

        String username = null;
        String authToken = null;
        if (Objects.nonNull(header) && header.startsWith(SecurityConstants.TOKEN_PREFIX)) {

            authToken = header.replace(SecurityConstants.TOKEN_PREFIX, Strings.EMPTY);

            try {
                username = jwtTokenManager.getUsernameFromToken(authToken);
            } catch (Exception e) {
                log.error("Authentication Exception : {}", e.getMessage());
                chain.doFilter(request, response);
                return;
            }
        }

        final SecurityContext securityContext = SecurityContextHolder.getContext();

        final boolean canBeStartTokenValidation = Objects.nonNull(username) && Objects.isNull(securityContext.getAuthentication());

        if (!canBeStartTokenValidation) {
            chain.doFilter(request, response);
            return;
        }

        final UserDetails user = userDetailsService.loadUserByUsername(username);
        final boolean validToken = jwtTokenManager.validateToken(authToken, user.getUsername());

        if (!validToken) {
            chain.doFilter(request, response);
            return;
        }

//        String requestURI = request.getRequestURI();
//        String httpMethod = request.getMethod();
//        log.info(requestURI);
//        log.info(httpMethod);
//        final boolean enable = userService.findByUsername(username).isEnabled();
//        log.info(String.valueOf(enable));
//
//        if (WHITE_LIST_API.containsKey(requestURI) && WHITE_LIST_API.get(requestURI).contains(httpMethod)) {
//            log.info("1");
//            if (!enable) {
//                log.info("2");
//                throw new AccessDeniedException("Access denied: Account not enabled");
//            }
//        }

        final UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        securityContext.setAuthentication(authentication);

        log.info("Authentication successful. Logged in username : {} ", username);

        chain.doFilter(request, response);
    }
}
