
      // Base de datos de productos (JSON)
    const productDatabase = {
      categorias: {
        "repuestos-refrigeracion": {
          nombre: "Repuestos Refrigeración",
          descripcion: "Filtros, válvulas, aceites y componentes",
          icon: "fas fa-snowflake",
          productos: [
            { id: 1, codigo: "001", nombre: "Fundente de Aluminio 200Gr", precio: 95000, stock: 1200, imagen: "001.jpg" },
            { id: 2, codigo: "002", nombre: "Válvula de servicio 1/4", precio: 5000, stock: 5000, imagen: "002.jpg" },
            { id: 3, codigo: "003", nombre: "Válvula Carga Gas R22", precio: 75000, stock: 500, imagen: "003.jpg" },
            { id: 4, codigo: "004", nombre: "Válvula Carga Gas R410", precio: 75000, stock: 500, imagen: "004.jpg" },
            { id: 5, codigo: "005", nombre: "Filtro secador silica 6gr", precio: 12000, stock: 1500, imagen: "005.jpg" },
            { id: 6, codigo: "006", nombre: "Filtro secador silica 15gr", precio: 15000, stock: 1600, imagen: "006.jpg" },
            { id: 7, codigo: "007", nombre: "Filtro secador silica 30gr", precio: 18000, stock: 1000, imagen: "007.jpg" },
            { id: 8, codigo: "008", nombre: "Filtro secador sin silica", precio: 10000, stock: 1000, imagen: "008.jpg" },
            { id: 9, codigo: "009", nombre: "Conector Baja R134 vehículo", precio: 50000, stock: 200, imagen: "009.jpg" },
            { id: 10, codigo: "010", nombre: "Conector Alta R134 vehículo", precio: 50000, stock: 200, imagen: "010.jpg" },
            { id: 46, codigo: "046", nombre: "Filtro Tela Condensador", precio: 25000, stock: 1500, imagen: "046.jpg" },
            { id: 47, codigo: "047", nombre: "Aceite Refrigerante PAG46+UV 250ML", precio: 75000, stock: 720, imagen: "047.jpg" },
            { id: 48, codigo: "048", nombre: "Aceite Refrigerante PAG46 250ML", precio: 75000, stock: 504, imagen: "048.jpg" },
            { id: 49, codigo: "049", nombre: "Aceite Refrigerante PAG100+UV 250ML", precio: 75000, stock: 504, imagen: "049.jpg" },
            { id: 113, codigo: "113", nombre: "Extractor Núcleo Válvula R22/R410", precio: 115000, stock: 100, imagen: "113.jpg" },
            { id: 108, codigo: "108", nombre: "Cinta Terminación crema sin adhesivo", precio: 12000, stock: 5000, imagen: "108.jpg" }
          ]
        },

        "reguladores-manometros": {
          nombre: "Reguladores y Manómetros",
          descripcion: "Control de presión industrial y medicinal",
          icon: "fas fa-gauge",
          productos: [
            { id: 12, codigo: "012", nombre: "Regulador Presión Oxígeno Industrial", precio: 350000, stock: 200, imagen: "012.jpg" },
            { id: 13, codigo: "013", nombre: "Humidificador Aire Medicinal", precio: 80000, stock: 400, imagen: "013.jpg" },
            { id: 15, codigo: "015", nombre: "Manómetro Alta presión 300 Bar", precio: 70000, stock: 250, imagen: "015.jpg" },
            { id: 16, codigo: "016", nombre: "Manómetro caudal 30 Litros CO2/Argón", precio: 70000, stock: 200, imagen: "016.jpg" },
            { id: 17, codigo: "017", nombre: "Manómetro caudal 30 Bar Oxígeno/Nitrógeno", precio: 70000, stock: 200, imagen: "017.jpg" },
            { id: 20, codigo: "020", nombre: "Regulador medicinal c/Humidificador y Cánula", precio: 480000, stock: 150, imagen: "020.jpg" },
            { id: 21, codigo: "021", nombre: "Regulador Presión CO2 Industrial", precio: 350000, stock: 250, imagen: "021.jpg" },
            { id: 22, codigo: "022", nombre: "Regulador Presión Argón Industrial", precio: 350000, stock: 150, imagen: "022.jpg" },
            { id: 23, codigo: "023", nombre: "Regulador GLP Industrial 10kg y 45kg", precio: 330000, stock: 50, imagen: "023.jpg" },
            { id: 24, codigo: "024", nombre: "Regulador Nitrógeno alta presión salida 1/4", precio: 450000, stock: 200, imagen: "024.jpg" },
            { id: 88, codigo: "088", nombre: "Regulador Presión CO2 para Cerveza", precio: 450000, stock: 100, imagen: "088.jpg" }
          ]
        },

        "cilindros-tanques": {
          nombre: "Cilindros y Tanques",
          descripcion: "Diferentes capacidades para gases",
          icon: "fas fa-gas-pump",
          productos: [
            { id: 29, codigo: "029", nombre: "Cilindro 7.5m3 (Oxígeno/Argón/Nitrógeno)", precio: 2400000, stock: 25, imagen: "029.jpg" },
            { id: 30, codigo: "030", nombre: "Cilindro 6m3 + CO2 25kg", precio: 2200000, stock: 50, imagen: "030.jpg" },
            { id: 31, codigo: "031", nombre: "Cilindro 4m3 + CO2 20kg", precio: 1900000, stock: 75, imagen: "031.jpg" },
            { id: 32, codigo: "032", nombre: "Cilindro 3m3 + CO2 15kg", precio: 1600000, stock: 75, imagen: "032.jpg" },
            { id: 33, codigo: "033", nombre: "Cilindro 2.5m3 + CO2 10kg", precio: 1500000, stock: 75, imagen: "033.jpg" },
            { id: 34, codigo: "034", nombre: "Cilindro 1.5m3 + CO2 7kg", precio: 1400000, stock: 25, imagen: "034.jpg" }
          ]
        },

        "valvulas-cilindros": {
          nombre: "Válvulas para Cilindros",
          descripcion: "Válvulas especializadas por tipo de gas",
          icon: "fas fa-faucet",
          productos: [
            { id: 35, codigo: "035", nombre: "Válvula CO2 Cilindro Aluminio", precio: 350000, stock: 100, imagen: "035.jpg" },
            { id: 36, codigo: "036", nombre: "Válvula Cilindro Argón", precio: 250000, stock: 150, imagen: "036.jpg" },
            { id: 37, codigo: "037", nombre: "Válvula Cilindro CO2", precio: 250000, stock: 150, imagen: "037.jpg" },
            { id: 38, codigo: "038", nombre: "Válvula Cilindro Acetileno", precio: 300000, stock: 25, imagen: "038.jpg" },
            { id: 39, codigo: "039", nombre: "Válvula Cilindro Oxígeno", precio: 250000, stock: 200, imagen: "039.jpg" }
          ]
        },

        "repuestos-radiadores": {
          nombre: "Repuestos Radiadores",
          descripcion: "Chapa, boquillas, fundente, varillas",
          icon: "fas fa-car-side",
          productos: [
            { id: 40, codigo: "040", nombre: "Boquilla Radiador Aluminio", precio: 20000, stock: 5000, imagen: "040.jpg" },
            { id: 41, codigo: "041", nombre: "Boquilla Radiador Bronce 0.9 Bar", precio: 25000, stock: 500, imagen: "041.jpg" },
            { id: 42, codigo: "042", nombre: "Tapa Radiador con resorte 0.9 Bar", precio: 15000, stock: 2000, imagen: "042.jpg" },
            { id: 43, codigo: "043", nombre: "Chapa Aluminio 50x100cm 1mm", precio: 75000, stock: 500, imagen: "043.jpg" },
            { id: 44, codigo: "044", nombre: "Chapa Aluminio 100x100cm 1mm", precio: 150000, stock: 500, imagen: "044.jpg" },
            { id: 45, codigo: "045", nombre: "Varilla Aluminio Soldadura 2.4mm", precio: 2000, stock: 5000, imagen: "045.jpg" }
          ]
        },

        "capacitores": {
          nombre: "Capacitores",
          descripcion: "Capacitores para equipos de refrigeración",
          icon: "fas fa-microchip",
          productos: [
            { id: 50, codigo: "050", nombre: "Capacitor 2.5 MF 380V con ficha", precio: 10000, stock: 1000, imagen: "050.jpg" },
            { id: 51, codigo: "051", nombre: "Capacitor 2.4 MF 380V con cable", precio: 10000, stock: 1000, imagen: "051.jpg" },
            { id: 52, codigo: "052", nombre: "Capacitor Metálico 35MF 450V", precio: 20000, stock: 1000, imagen: "052.jpg" },
            { id: 53, codigo: "053", nombre: "Capacitor Metálico 45MF 450V", precio: 24000, stock: 700, imagen: "053.jpg" }
          ]
        },

        "cerveza-bar": {
          nombre: "Equipos Cerveza/Bar",
          descripcion: "Conectores, canillas y máquinas",
          icon: "fas fa-beer-mug-empty",
          productos: [
            { id: 54, codigo: "054", nombre: "Conector Barril Tipo G (Pilsen)", precio: 400000, stock: 100, imagen: "054.jpg" },
            { id: 55, codigo: "055", nombre: "Conector Barril Tipo A (Munich)", precio: 400000, stock: 100, imagen: "055.jpg" },
            { id: 56, codigo: "056", nombre: "Canilla Cerveza Ajustable", precio: 380000, stock: 20, imagen: "056.jpg" },
            { id: 57, codigo: "057", nombre: "Máquina Cerveza dos salidas completa", precio: 8000000, stock: 6, imagen: "057.jpg" },
            { id: 58, codigo: "058", nombre: "Bandeja Goteo Inoxidable 41x19x3cm", precio: 450000, stock: null, imagen: "058.jpg" }
          ]
        },

        "soldadura-tig": {
          nombre: "Soldadura TIG",
          descripcion: "Aportes, tungstenos y accesorios",
           icon: "fas fa-fire-flame-curved",
          productos: [
            { id: 28, codigo: "028", nombre: "Juego Pico Soldar con 3 Picos", precio: 480000, stock: 200, imagen: "028.jpg" },
            { id: 27, codigo: "027", nombre: "Lanza Corte Condor con puntera", precio: 750000, stock: 50, imagen: "027.jpg" },
            { id: 59, codigo: "059", nombre: "Aporte Inoxidable ER308L 1.2mm", precio: 130000, stock: 300, unidad: "kg", imagen: "059.jpg" },
            { id: 60, codigo: "060", nombre: "Aporte Inoxidable ER308L 1.6mm", precio: 120000, stock: 300, unidad: "kg", imagen: "060.jpg" },
            { id: 61, codigo: "061", nombre: "Aporte Inoxidable ER308 2.0mm", precio: 120000, stock: 200, unidad: "kg", imagen: "061.jpg" },
            { id: 62, codigo: "062", nombre: "Aporte Aluminio TIG 2.4mm", precio: 2500, stock: 1000, unidad: "UN", imagen: "062.jpg" },
            { id: 63, codigo: "063", nombre: "Aporte Aluminio TIG 3.2mm", precio: 3500, stock: 1000, unidad: "UN", imagen: "063.jpg" },
            { id: 111, codigo: "111", nombre: "TUNGSTENO Punta Roja 2.4mm INOX", precio: 20000, stock: 300, imagen: "111.jpg" },
            { id: 112, codigo: "112", nombre: "TUNGSTENO Punta Roja 1.6mm INOX", precio: 15000, stock: 200, imagen: "112.jpg" }
          ]
        },

        "gases-refrigerantes": {
          nombre: "Gases Refrigerantes",
          descripcion: "R22, R134, R410, R404 y más",
          icon: "fas fa-temperature-low",
          productos: [
            { id: 64, codigo: "064", nombre: "Gas Refrigerante R22 13.6kg", precio: 1500000, stock: 100, imagen: "064.jpg" },
            { id: 65, codigo: "065", nombre: "Gas Refrigerante R134 13.6kg", precio: 1450000, stock: 100, imagen: "065.jpg" },
            { id: 66, codigo: "066", nombre: "Gas Refrigerante R410 11.3kg", precio: 1300000, stock: 100, imagen: "066.jpg" },
            { id: 67, codigo: "067", nombre: "Gas Refrigerante R404 10.2kg", precio: 1250000, stock: 100, imagen: "067.jpg" },
            { id: 68, codigo: "068", nombre: "Gas Refrigerante R404 9.5kg", precio: 1150000, stock: 100, imagen: "068.jpg" },
            { id: 69, codigo: "069", nombre: "Gas Refrigerante R600 400Gr", precio: 60000, stock: 100, imagen: "069.jpg" },
            { id: 70, codigo: "070", nombre: "Gas Map 400Gr Marca Global", precio: 45000, stock: 100, imagen: "070.jpg" }
          ]
        },

        "soportes-aire": {
          nombre: "Soportes Aire Acondicionado",
          descripcion: "Soportes universales y originales",
          icon: "fas fa-fan",
          productos: [
            { id: 71, codigo: "071", nombre: "Soporte Universal Ext 9K/12K/18K BTU", precio: 25000, stock: 100, imagen: "071.jpg" },
            { id: 72, codigo: "072", nombre: "Soporte Universal Int 9K/12K/18K BTU", precio: 30000, stock: 100, imagen: "072.jpg" },
            { id: 73, codigo: "073", nombre: "Soporte Original 9K/12K BTU", precio: 110000, stock: 50, imagen: "073.jpg" },
            { id: 74, codigo: "074", nombre: "Soporte Original 18K/24K BTU", precio: 120000, stock: 50, imagen: "074.jpg" },
            { id: 75, codigo: "075", nombre: "Soporte Original 36K BTU", precio: 130000, stock: 50, imagen: "075.jpg" },
            { id: 76, codigo: "076", nombre: "Soporte Original 48K/60K BTU", precio: 145000, stock: 50, imagen: "076.jpg" },
            { id: 77, codigo: "077", nombre: "Control Universal Aire", precio: 35000, stock: 50, imagen: "077.jpg" }
          ]
        },

        "canerias-cobre": {
          nombre: "Cañerías de Cobre",
          descripcion: "Diferentes medidas para instalaciones",
           icon: "fas fa-pipe-section",
          productos: [
            { id: 78, codigo: "078", nombre: "Cañería Cobre 3/16", precio: 240000, stock: 50, imagen: "078.jpg" },
            { id: 79, codigo: "079", nombre: "Cañería Cobre 1/4", precio: 255000, stock: 50, imagen: "079.jpg" },
            { id: 80, codigo: "080", nombre: "Cañería Cobre 5/16", precio: 315000, stock: 50, imagen: "080.jpg" },
            { id: 81, codigo: "081", nombre: "Cañería Cobre 3/8", precio: 370000, stock: 50, imagen: "081.jpg" },
            { id: 82, codigo: "082", nombre: "Cañería Cobre 1/2", precio: 470000, stock: 50, imagen: "082.jpg" },
            { id: 83, codigo: "083", nombre: "Cañería Cobre 5/8", precio: 590000, stock: 50, imagen: "083.jpg" },
            { id: 84, codigo: "084", nombre: "Cañería Cobre 3/4", precio: 705000, stock: 50, imagen: "084.jpg" }
          ]
        },

        "mangueras-accesorios": {
          nombre: "Mangueras y Accesorios",
          descripcion: "Conexiones y tuberías especializadas",
          icon: "fas fa-circle-nodes",
          productos: [
            { id: 85, codigo: "085", nombre: "Manguera doble OXÍGENO/Gas 200mts", precio: 18000, stock: 200, unidad: "metro", imagen: "085.jpg" },
            { id: 86, codigo: "086", nombre: "Manguera Aire 5/16 100mts", precio: 10000, stock: 100, unidad: "metro", imagen: "086.jpg" },
            { id: 87, codigo: "087", nombre: "Anti retroceso llamas Oxígeno/Gas", precio: 250000, stock: 100, imagen: "087.jpg" },
            { id: 109, codigo: "109", nombre: "Manguera Flexible 130cm 3000 PSI", precio: 480000, stock: 100, imagen: "109.jpg" },
            { id: 110, codigo: "110", nombre: "Manguera Flexible 180cm 3000 PSI", precio: 650000, stock: 30, imagen: "110.jpg" }
          ]
        },

        "accesorios-varios": {
          nombre: "Accesorios Varios",
          descripcion: "Tuercas, adaptadores y componentes",
         icon: "fas fa-screwdriver-wrench",
          productos: [
            { id: 11, codigo: "011", nombre: "PEINE metálico enderezador evaporador", precio: 28000, stock: 100, imagen: "011.jpg" },
            { id: 14, codigo: "014", nombre: "Tuerca Bronce Oxígeno", precio: 70000, stock: 300, imagen: "014.jpg" },
            { id: 18, codigo: "018", nombre: "Tuerca Bronce CO2", precio: 70000, stock: 300, imagen: "018.jpg" },
            { id: 19, codigo: "019", nombre: "Tuerca Bronce Argón", precio: 70000, stock: 200, imagen: "019.jpg" },
            { id: 25, codigo: "025", nombre: "Adaptador Nitrógeno Paso Grueso", precio: 120000, stock: 150, imagen: "025.jpg" },
            { id: 26, codigo: "026", nombre: "Adaptador Nitrógeno Paso Fino", precio: 120000, stock: 150, imagen: "026.jpg" },
            { id: 89, codigo: "089", nombre: "Vástago Oxígeno", precio: 80000, stock: 100, imagen: "089.jpg" },
            { id: 90, codigo: "090", nombre: "Vástago CO2", precio: 80000, stock: 100, imagen: "090.jpg" },
            { id: 91, codigo: "091", nombre: "Vástago Argón", precio: 80000, stock: 100, imagen: "091.jpg" },
            { id: 114, codigo: "114", nombre: "Fundente Plata Cobre Argenta 50Gr", precio: 18000, stock: 100, imagen: "114.jpg" },
            { id: 115, codigo: "115", nombre: "Arandela Teflón Oxígeno/CO2", precio: 10000, stock: 1000, imagen: "115.jpg" }
          ]
        },

        "accesorios-vehiculos": {
          nombre: "Accesorios Vehículos",
          descripcion: "Accesorios para vehículos",
         icon: "fas fa-car-battery",
          productos: [
            { id: 107, codigo: "107", nombre: "Baliza Doble con estuche plástico", precio: 25000, stock: 1000, imagen: "107.jpg" }
          ]
        },

        "extintores": {
          nombre: "Extintores",
          descripcion: "Venta y recarga de extintores",
          icon: "fas fa-fire-extinguisher",
          productos: [
            { id: 102, codigo: "102", nombre: "Extintor PQS 1kg Nuevo", precio: 120000, stock: null, imagen: "102.jpg" },
            { id: 103, codigo: "103", nombre: "Extintor PQS 2kg Nuevo", precio: 145000, stock: null, imagen: "103.jpg" },
            { id: 104, codigo: "104", nombre: "Extintor PQS 4kg Nuevo", precio: 230000, stock: null, imagen: "104.jpg" },
            { id: 105, codigo: "105", nombre: "Extintor PQS 6kg Nuevo", precio: 270000, stock: null, imagen: "105.jpg" },
            { id: 106, codigo: "106", nombre: "Extintor PQS 10kg Nuevo", precio: 350000, stock: null, imagen: "106.jpg" }
          ]
        },
        "varios": {
          nombre: "Productos Varios",
          descripcion: "Accesorios y herramientas diversas",
          icon: "fas fa-toolbox",
          productos: [
            { id: 108, codigo: "108", nombre: "Cinta Terminación crema sin adhesivo", precio: 12000, stock: 5000, imagen: "108.jpg" }
          ]
        },

        "servicios-recarga": {
          nombre: "Servicios de Recarga",
          descripcion: "Recarga de gases y extintores",
          icon: "fas fa-arrows-rotate",
          productos: [
            { id: 92, codigo: "092", nombre: "Recarga Oxígeno M3", precio: 35000, stock: null, unidad: "servicio", imagen: "092.jpg" },
            { id: 93, codigo: "093", nombre: "Recarga Argón M3", precio: 130000, stock: null, unidad: "servicio", imagen: "093.jpg" },
            { id: 94, codigo: "094", nombre: "Recarga Nitrógeno M3", precio: 35000, stock: null, unidad: "servicio", imagen: "094.jpg" },
            { id: 95, codigo: "095", nombre: "Recarga CO2 10kg", precio: 160000, stock: null, unidad: "servicio", imagen: "095.jpg" },
            { id: 96, codigo: "096", nombre: "Recarga CO2 20kg", precio: 320000, stock: null, unidad: "servicio", imagen: "096.jpg" },
            { id: 97, codigo: "097", nombre: "Recarga Acetileno 1kg", precio: 250000, stock: null, unidad: "servicio", imagen: "097.jpg" },
            { id: 98, codigo: "098", nombre: "Recarga Extintor PQS 1kg", precio: 50000, stock: null, unidad: "servicio", imagen: "098.jpg" },
            { id: 99, codigo: "099", nombre: "Recarga Extintor PQS 4kg", precio: 75000, stock: null, unidad: "servicio", imagen: "099.jpg" },
            { id: 100, codigo: "100", nombre: "Recarga Extintor PQS 6kg", precio: 90000, stock: null, unidad: "servicio", imagen: "100.jpg" },
            { id: 101, codigo: "101", nombre: "Recarga Extintor PQS 10kg", precio: 140000, stock: null, unidad: "servicio", imagen: "101.jpg" }
          ]
        },

        /* === Nuevas categorías duplicando cilindros como tubos === */
        "tubos-oxigeno": {
          nombre: "Tubos de Oxígeno",
          descripcion: "Tubos/cilindros para oxígeno",
         icon: "fas fa-lungs",
          productos: [
            { id: 29, codigo: "029", nombre: "Tubo Oxígeno 7.5m3 (Oxígeno/Argón/Nitrógeno)", precio: 2400000, stock: 25, imagen: "029.jpg" },
            { id: 30, codigo: "030", nombre: "Tubo Oxígeno 6m3 + CO2 25kg", precio: 2200000, stock: 50, imagen: "030.jpg" },
            { id: 31, codigo: "031", nombre: "Tubo Oxígeno 4m3 + CO2 20kg", precio: 1900000, stock: 75, imagen: "031.jpg" },
            { id: 32, codigo: "032", nombre: "Tubo Oxígeno 3m3 + CO2 15kg", precio: 1600000, stock: 75, imagen: "032.jpg" },
            { id: 33, codigo: "033", nombre: "Tubo Oxígeno 2.5m3 + CO2 10kg", precio: 1500000, stock: 75, imagen: "033.jpg" },
            { id: 34, codigo: "034", nombre: "Tubo Oxígeno 1.5m3 + CO2 7kg", precio: 1400000, stock: 25, imagen: "034.jpg" }
          ]
        },

        "tubos-nitrogeno": {
          nombre: "Tubos de Nitrógeno",
          descripcion: "Tubos/cilindros para nitrógeno",
          icon: "fas fa-vial",
          productos: [
            { id: 29, codigo: "029", nombre: "Tubo Nitrógeno 7.5m3 (Oxígeno/Argón/Nitrógeno)", precio: 2400000, stock: 25, imagen: "029.jpg" },
            { id: 30, codigo: "030", nombre: "Tubo Nitrógeno 6m3 + CO2 25kg", precio: 2200000, stock: 50, imagen: "030.jpg" },
            { id: 31, codigo: "031", nombre: "Tubo Nitrógeno 4m3 + CO2 20kg", precio: 1900000, stock: 75, imagen: "031.jpg" },
            { id: 32, codigo: "032", nombre: "Tubo Nitrógeno 3m3 + CO2 15kg", precio: 1600000, stock: 75, imagen: "032.jpg" },
            { id: 33, codigo: "033", nombre: "Tubo Nitrógeno 2.5m3 + CO2 10kg", precio: 1500000, stock: 75, imagen: "033.jpg" },
            { id: 34, codigo: "034", nombre: "Tubo Nitrógeno 1.5m3 + CO2 7kg", precio: 1400000, stock: 25, imagen: "034.jpg" }
          ]
        },

        "tubos-co2": {
          nombre: "Tubos de CO2",
          descripcion: "Tubos/cilindros para dióxido de carbono",
          icon: "fas fa-smog",
          productos: [
            { id: 29, codigo: "029", nombre: "Tubo CO2 7.5m3 (Oxígeno/Argón/Nitrógeno)", precio: 2400000, stock: 25, imagen: "029.jpg" },
            { id: 30, codigo: "030", nombre: "Tubo CO2 6m3 + CO2 25kg", precio: 2200000, stock: 50, imagen: "030.jpg" },
            { id: 31, codigo: "031", nombre: "Tubo CO2 4m3 + CO2 20kg", precio: 1900000, stock: 75, imagen: "031.jpg" },
            { id: 32, codigo: "032", nombre: "Tubo CO2 3m3 + CO2 15kg", precio: 1600000, stock: 75, imagen: "032.jpg" },
            { id: 33, codigo: "033", nombre: "Tubo CO2 2.5m3 + CO2 10kg", precio: 1500000, stock: 75, imagen: "033.jpg" },
            { id: 34, codigo: "034", nombre: "Tubo CO2 1.5m3 + CO2 7kg", precio: 1400000, stock: 25, imagen: "034.jpg" }
          ]
        },

        "tubos-argon": {
          nombre: "Tubos de Argón",
          descripcion: "Tubos/cilindros para argón",
         icon: "fas fa-atom",
          productos: [
            { id: 29, codigo: "029", nombre: "Tubo Argón 7.5m3 (Oxígeno/Argón/Nitrógeno)", precio: 2400000, stock: 25, imagen: "029.jpg" },
            { id: 30, codigo: "030", nombre: "Tubo Argón 6m3 + CO2 25kg", precio: 2200000, stock: 50, imagen: "030.jpg" },
            { id: 31, codigo: "031", nombre: "Tubo Argón 4m3 + CO2 20kg", precio: 1900000, stock: 75, imagen: "031.jpg" },
            { id: 32, codigo: "032", nombre: "Tubo Argón 3m3 + CO2 15kg", precio: 1600000, stock: 75, imagen: "032.jpg" },
            { id: 33, codigo: "033", nombre: "Tubo Argón 2.5m3 + CO2 10kg", precio: 1500000, stock: 75, imagen: "033.jpg" },
            { id: 34, codigo: "034", nombre: "Tubo Argón 1.5m3 + CO2 7kg", precio: 1400000, stock: 25, imagen: "034.jpg" }
          ]
        }
      }
    };
