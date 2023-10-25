package com.login.login.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = UUID.randomUUID().toString();
    private static final int TOKEN_VALIDITY = 600 * 5;

    /**
     * The function `getUserNameFromToken` returns the username extracted from a token.
     */
    public String getUserNameFromToken(String token) {
        return getClaim(token, Claims::getSubject);
    }

    /**
     * The `getClaim` function retrieves a specific claim from a token by applying a claim resolver
     * function to the token's claims.
     */
    private <T> T getClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = getAllClaims(token);
        return claimResolver.apply(claims);
    }

    /**
     * The function `getAllClaims` takes a token as input, parses and verifies it using a secret key, and
     * returns the claims contained in the token.
     */
    private Claims getAllClaims(String token) {
        return Jwts
                .parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * The function validates a token by checking if the username extracted from the token matches the
     * username in the user details and if the token has not expired.
     */
    public boolean validate(String token, UserDetails userDetails) {
        String userName = getUserNameFromToken(token);
        return (userName.equals(userDetails.getUsername()) && !tokenExpired(token));
    }

    /**
     * The function checks if a given token has expired by comparing its expiration date with the current
     * date.
    **/
    private boolean tokenExpired(String token) {
        final Date expDate = getExpDate(token);
        return expDate.before(new Date());
    }


    // The function "getExpDate" returns the expiration date of a token.
    private Date getExpDate(String token) {
        return getClaim(token, Claims::getExpiration);
    }


    // The function generates a token using the user details and returns it as a string.
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();

        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(
                        new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }
}
