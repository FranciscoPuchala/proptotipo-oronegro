// Selecciona el botón del carrito
const cartButton = document.querySelector('.cart-button');

// Función para mostrar una notificación temporal al usuario.
const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        opacity: 1;
        transition: opacity 0.5s;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, 2000);
};

// Función para actualizar el contador del carrito en el encabezado.
const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
    cartButton.textContent = `🛒 Carrito (${totalItems})`;
};

// Lógica para el filtro de categorías
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Función para manejar el filtro al hacer clic en un botón
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            // Oculta todas las secciones de productos
            document.querySelectorAll('.product-category').forEach(section => {
                section.style.display = 'none';
            });
            
            // Remueve la clase 'active' de todos los botones de filtro
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agrega la clase 'active' al botón seleccionado
            button.classList.add('active');

            if (category === 'all') {
                // Muestra todas las secciones de productos
                document.querySelectorAll('.product-category').forEach(section => {
                    section.style.display = 'block';
                });
            } else {
                // Muestra solo la sección de la categoría seleccionada
                const selectedSection = document.querySelector(`.product-category[data-category="${category}"]`);
                if (selectedSection) {
                    selectedSection.style.display = 'block';
                }
            }
        });
    });

    // Lógica para redirigir a la página de producto
    const viewProductBtns = document.querySelectorAll('.add-to-cart');
    viewProductBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Previene el comportamiento predeterminado del enlace
            const productCard = button.closest('.product-card');

            // Asegúrate de que la tarjeta de producto exista
            if (!productCard) {
                console.error("No se encontró la tarjeta de producto.");
                showNotification("Error: No se puede ver el producto. Inténtalo de nuevo.");
                return;
            }

            // Recopila los datos del producto DIRECTAMENTE del HTML
            const productId = productCard.getAttribute('data-id');
            const productName = productCard.querySelector('h3').textContent;
            const productPriceText = productCard.querySelector('.price').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', '').replace('.', '').replace(',', '.'));
            
            // Obtiene la imagen según el ID
            let productImage = '';
            if (productId === '1') {
                productImage = '../img/iphone-16-pro-max-1_6EFF873F24804524AAB5AAD8389E9913.jpg';
            } else if (productId === '8') {
                productImage = '../img/descarga.avif';
            } else if (productId === '2') {
                productImage = '../img/D_NQ_NP_758447-MLA46975173385_082021-O.webp';
            } else if (productId === '6') {
                productImage = '../img/D_NQ_NP_977736-MLA83571171203_042025-O.webp';
            } else if (productId === '3') {
                productImage = '../img/D_Q_NP_2X_882490-MLU77852262960_072024-P.webp';
            } else if (productId === '7') {
                productImage = '../img/apple-airpods-pro-segunda-generacion.jpg';
            } else if (productId === '5') {
                productImage = '../img/D_NQ_NP_692212-MLU70775490991_072023-O.webp';
            }

            // Añade descripción y características según el ID
            let productDescription;
            let productFeatures;
            
            if (productId === "1") { 
                productDescription = "El iPhone más potente y sofisticado hasta la fecha. Con una pantalla más grande, cámaras de nivel profesional y un rendimiento inigualable.";
                productFeatures = ["Cámara principal de 50 MP", "Pantalla OLED de 6.7\" con ProMotion", "Batería de larga duración", "Cuerpo de titanio"];
            } else if (productId === "8") {
                productDescription = "El iPhone SE combina el chip A15 Bionic, 5G, gran autonomía y un diseño robusto en un solo dispositivo.";
                productFeatures = ["Chip A15 Bionic", "Conectividad 5G ultrarrápida", "Gran autonomía de batería", "Botón de inicio con Touch ID"];
            } else if (productId === "2") {
                productDescription = "El iPad Pro es el lienzo y el cuaderno más versátiles del mundo.";
                productFeatures = ["Chip M4 ultrarrápido", "Pantalla Liquid Retina XDR", "Sistema de cámara avanzado"];
            } else if (productId === "6") {
                productDescription = "El MacBook Air 15'' es increíblemente fino, potente y perfecto para cualquier tarea.";
                productFeatures = ["Chip M3", "Pantalla Liquid Retina de 15.3 pulgadas", "Batería de hasta 18 horas"];
            } else if (productId === "3") {
                productDescription = "El Apple Watch Series 10 te ayuda a mantenerte activo, sano y conectado.";
                productFeatures = ["Pantalla más grande", "Nuevas funciones de salud", "Detección de accidentes"];
            } else if (productId === "7") {
                productDescription = "Los AirPods Pro ofrecen cancelación de ruido, sonido envolvente y un ajuste cómodo.";
                productFeatures = ["Cancelación activa de ruido", "Modo de sonido ambiente adaptable", "Audio espacial personalizado"];
            } else if (productId === "5") {
                productDescription = "El Cargador MagSafe simplifica la carga inalámbrica.";
                productFeatures = ["Carga rápida inalámbrica", "Imanes perfectamente alineados", "Diseño compacto"];
            } else {
                productDescription = "Descripción no disponible.";
                productFeatures = [];
            }
            
            const selectedProduct = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                description: productDescription,
                features: productFeatures
            };

            // Guarda el producto seleccionado en localStorage antes de redirigir.
            localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));

            // Redirige al usuario a la página del producto.
            window.location.href = `../Producto/pagina_producto.html`;
        });
    });
});

// Llama a la función de actualización del carrito.
updateCartCount();