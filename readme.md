# 🚗 Location voiture app - Architecture Microservices

## 📌 Objectif du Projet
L'objectif de ce projet est de créer une **application de location de voitures** utilisant une **architecture en microservices**. Cette architecture permet une **meilleure scalabilité**, une **meilleure maintenance**, et une **indépendance des services**.

## 🏗️ Architecture du Projet
Le projet est découpé en plusieurs **microservices** indépendants qui communiquent entre eux via des **API REST** et un **message broker (Kafka)** pour la communication asynchrone.

### 📂 Structure des Dossiers
```
location-voiture/
│── auth-service/        # Service d'authentification
│── vehicle-service/     # Service de gestion des véhicules
│── booking-service/     # Service de réservation des véhicules
│── billing-service/     # Service de facturation
│── api-gateway/         # Passerelle API pour centraliser les requêtes
│── shared/              # Fichiers partagés entre services (ex: modèles communs)
│── docker-compose.yml   # Conteneurisation des services avec Docker
│── README.md            # Documentation du projet
```

### 📌 Description des Services

| Microservice          | Description |
|----------------------|------------|
| **Auth-Service** | Gère l'inscription, la connexion et l'authentification des utilisateurs. |
| **Vehicle-Service** | Gère les voitures disponibles à la location. |
| **Booking-Service** | Gère la réservation des véhicules. |
| **Billing-Service** | Gère la facturation et le paiement des locations. |
| **API Gateway** | Route les requêtes vers les bons microservices. |

## 🔗 Communication entre les Microservices

| Type de Communication | Technologie Utilisée | Explication |
|----------------------|--------------------|------------|
| **API REST** | Express.js + HTTP | Utilisé pour les requêtes directes entre services (ex: Booking-Service demande les voitures disponibles à Vehicle-Service). |
| **Message Broker** | RabbitMQ | Utilisé pour les événements asynchrones (ex: Booking-Service envoie un message à Billing-Service après une réservation). |

### 📌 Exemples de communication

1. **Un utilisateur réserve une voiture** 🚗
   - Le **Booking-Service** vérifie la disponibilité d’un véhicule via une requête API REST au **Vehicle-Service**.
   - Une fois la réservation validée, il envoie un **message RabbitMQ** à **Billing-Service** pour générer une facture.

2. **Un paiement est effectué** 💳
   - Le **Billing-Service** enregistre le paiement et envoie un message au **Booking-Service** pour confirmer la réservation.
   - Le **Booking-Service** met à jour l’état de la réservation.

## 🛠️ Technologies Utilisées
| Technologie  | Utilisation  |
|-------------|-------------|
| **Node.js + Express.js** | Backend des microservices |
| **PostgreSQL** | Base de données relationnelle (Auth, Billing, Booking) |
| **MongoDB** | Base NoSQL pour le Vehicle-Service |
| **RabbitMQ** | Message broker pour la communication asynchrone |
| **Docker** | Conteneurisation des services |

## 🚀 Installation et Démarrage
1. **Cloner le projet**
   ```sh
   git clone https://github.com/Lordkode/location-voiture.git
   cd location-voiture
   ```

2. **Installer les dépendances de chaque microservice**
   ```sh
   cd auth-service && npm install && cd ..
   cd vehicle-service && npm install && cd ..
   cd booking-service && npm install && cd ..
   cd billing-service && npm install && cd ..
   cd api-gateway && npm install && cd ..
   ```

3. **Lancer les microservices**
   ```sh
   cd auth-service && node server.js &
   cd vehicle-service && node server.js &
   cd booking-service && node server.js &
   cd billing-service && node server.js &
   cd api-gateway && node server.js &
   ```

4. **Tester les services** (exemple avec cURL pour tester l'authentification)
   ```sh
   curl -X POST http://localhost:5001/register -H "Content-Type: application/json" -d '{"email":"test@example.com", "password":"123456"}'
   ```

## 📌 Prochaines Étapes
- [ ] Implémentation des bases de données pour chaque service.
- [ ] Déploiement avec Docker et Kubernetes.
- [ ] Mise en place d'un système de logs et de monitoring.

---
📌 **Ce projet est en développement**. Des mises à jour et optimisations seront ajoutées progressivement. 🚀

