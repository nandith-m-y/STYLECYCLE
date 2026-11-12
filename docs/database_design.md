# STYLECYCLE - Database Design

## Core Entities
1. **users**: id, email, password_hash, full_name, phone, role, created_at
2. **profiles**: user_id, bio, avatar_url, height_cm, chest_cm, waist_cm, hip_cm, preferred_fit
3. **addresses**: id, user_id, street, city, state, postal_code, is_default
4. **products**: id, seller_id, title, brand, category_id, gender, size, condition, price, original_price, is_exchangeable, status
5. **product_images**: id, product_id, image_url, is_primary, display_order
6. **orders**: id, buyer_id, total_amount, payment_method, status, shipping_address_id
7. **order_items**: id, order_id, product_id, price, size
8. **exchanges**: id, requester_id, requested_product_id, offered_product_id, cash_difference, status, message
9. **wardrobe_items**: id, user_id, name, category, color, brand, size, season, image_url, is_favorite
10. **outfits**: id, user_id, name, occasion, top_item_id, bottom_item_id, shoe_item_id, accessory_item_id
