package edu.icet.demo.service;

import edu.icet.demo.entity.OrderEntity;
import edu.icet.demo.entity.OrderItemEntity;
import edu.icet.demo.entity.ProductEntity;
import edu.icet.demo.model.Order;
import edu.icet.demo.model.OrderItem;
import edu.icet.demo.model.UserOrders;
import edu.icet.demo.repository.OrderItemRepository;
import edu.icet.demo.repository.OrderRepository;
import edu.icet.demo.repository.ProductRepository;
import edu.icet.demo.repository.UserRepository;
import edu.icet.demo.service.OrderService;
import lombok.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository repository;
    private final ProductRepository productRepository;
            private final OrderItemRepository orderItemRepository;
    private final ModelMapper mapper;

    private final String merchantId="1229807";


    private final String merchantSecret="NDA1MDM0ODcyMjQ0Nzk3ODgyOTI4MDU4MDU3NDQzNTQ5MjcwMTQ4";

    public void saveOrder(Order order) {
        System.out.println("Saving order in Service...");

        // Convert DTO to Entity
        OrderEntity orderEntity = mapper.map(order, OrderEntity.class);

        List<OrderItemEntity> orderItemEntityList = new ArrayList<>();

        if (order.getOrderItems() != null) {
            orderItemEntityList = order.getOrderItems().stream().map(orderItem -> {
                System.out.println("Processing Order Item -> Product ID: " + orderItem.getProductID());
                System.out.println("product id  "+orderItem.getProductID());
                OrderItemEntity itemEntity = mapper.map(orderItem, OrderItemEntity.class);
                itemEntity.setOrder(orderEntity);

                // Fetch product from DB
                ProductEntity product = productRepository.findById(orderItem.getProductID())
                        .orElseThrow(() -> new RuntimeException("Product not found: " + orderItem.getProductID()));
                // update qty//
                itemEntity.setProduct(product);
                product.setProductQty(product.getProductQty()-orderItem.getOrderItemQty());
                productRepository.save(product);
                return itemEntity;
            }).toList();
        }

        orderEntity.setOrderItemList(orderItemEntityList);

        // Debugging before saving
        orderEntity.getOrderItemList().forEach(item ->
                System.out.println("Final Order Item -> Product ID: " + item.getProduct().getProductID()));

        repository.save(orderEntity);
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

    @Override
    public ResponseEntity<List<Order>> sendOrderDetails(Integer userID) {
        List<OrderEntity> orders = repository.findByUser_UserID(userID);
        List<Order> userOrders=new ArrayList<>();

        for(OrderEntity order:orders){
            Order order1 =new Order();
            order1.setOrderID(order.getOrderID());
            order1.setOrderAmount(order.getOrderAmount());
            order1.setShippingCost(order.getShippingCost());
            order1.setTotalCost(order.getTotalCost());
            order1.setOrderDate(order.getOrderDate());

            List<OrderItemEntity> orderItemEntity= orderItemRepository.findByOrder_OrderID(order.getOrderID());

            List<OrderItem> orderItems=new ArrayList<>();

            for(OrderItemEntity orderItem:orderItemEntity){

                OrderItem orderItem1=new OrderItem();
                orderItem1.setOrderItemQty(orderItem.getOrderItemQty());
                orderItem1.setProductName(orderItem.getProduct().getProduct_name());
                orderItem1.setProductImageURL(orderItem.getProduct().getProductImageURL());

                orderItems.add(orderItem1);
            }
            order1.setOrderItems(orderItems);
            userOrders.add(order1);



        }

        return ResponseEntity.ok(userOrders);
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

