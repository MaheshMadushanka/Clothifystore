package edu.icet.demo.service;

import edu.icet.demo.entity.OrderEntity;
import edu.icet.demo.model.Order;
import edu.icet.demo.repository.OrderRepository;
import edu.icet.demo.service.OrderService;
import lombok.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


@Data
@AllArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository repository;
    private final ModelMapper mapper;

    private final String merchantId="1229807";


    private final String merchantSecret="NDA1MDM0ODcyMjQ0Nzk3ODgyOTI4MDU4MDU3NDQzNTQ5MjcwMTQ4";

    public void saveOrder(Order order) {
        repository.save(mapper.map(order, OrderEntity.class));
    }

    @Override
    public String generatePaymentHash(String orderId, BigDecimal amount, String currency) {
        try {
            String formattedAmount = String.format("%.2f", amount);
            String hashString = merchantId + orderId + formattedAmount + currency + toUpperCaseMD5(merchantSecret);
            return toUpperCaseMD5(hashString).toUpperCase();
        } catch (Exception e) {
            throw new RuntimeException("Error generating hash", e);
        }
    }

//    private String hashMd5(String input) {
//        try {
//            MessageDigest md = MessageDigest.getInstance("MD5");
//            md.update(input.getBytes());
//            byte[] digest = md.digest();
//            StringBuilder sb = new StringBuilder();
//            for (byte b : digest) {
//                sb.append(String.format("%02x", b));
//            }
//            return sb.toString();
//        } catch (NoSuchAlgorithmException e) {
//            throw new RuntimeException("MD5 Algorithm not found", e);
//        }
//    }
//}

//public static String generateHash(Integer orderId, Double totalAmount, String currency, String MERCHANT_ID, String MERCHANT_SECRET) {
//    try {
//
//        String merchantSecretHash = toUpperCaseMD5(MERCHANT_SECRET);
//
//        String dataToHash = MERCHANT_ID + orderId + String.format("%.2f", totalAmount) + currency + merchantSecretHash;
//
//        return toUpperCaseMD5(dataToHash);
//
//    } catch (NoSuchAlgorithmException e) {
//        throw new RuntimeException("Error generating hash", e);
//    }
//}

private static String toUpperCaseMD5(String input) throws NoSuchAlgorithmException {
    MessageDigest md = MessageDigest.getInstance("MD5");
    byte[] messageDigest = md.digest(input.getBytes());
    BigInteger no = new BigInteger(1, messageDigest);
    StringBuilder hash = new StringBuilder(no.toString(16).toUpperCase());

    while (hash.length() < 32) {
        hash.insert(0, "0");
    }

    return hash.toString();
}
}

