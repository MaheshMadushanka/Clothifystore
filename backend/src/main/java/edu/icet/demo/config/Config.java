package edu.icet.demo.config;

import edu.icet.demo.entity.ProductEntity;
import edu.icet.demo.model.Product;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {
    @Bean
    public ModelMapper getMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Clear all default mapping behavior
        modelMapper.getConfiguration().setFieldMatchingEnabled(false);

        // Map ProductEntity → Product
        modelMapper.addMappings(new PropertyMap<ProductEntity, Product>() {
            @Override
            protected void configure() {
                map().setCategoryID(source.getCategoryID().getCategoryID());
            }
        });

        // Map Product → ProductEntity (skip categoryID here)
        modelMapper.addMappings(new PropertyMap<Product, ProductEntity>() {
            @Override
            protected void configure() {
                skip(destination.getCategoryID());
            }
        });

        return modelMapper;
    }
}
