package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"context"
	"fmt"
	"log"
	"strconv"
)

type car struct {
	Registration string `bson:"registration"`
	Brand        string `bson:"brand"`
	Model        int    `bson:"model"`
	Series       string `bson:"series"`
	Color        string `bson:"color"`
}

func main() {
	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"data": "Hello from Go, gin & mongoDB",
		})
	})

	router.GET("/cars", getAll)
	router.POST("/cars", createEntity)
	router.PUT("/cars/:registration", updateEntity)
	router.DELETE("/cars/:registration", deleteEntity)

	router.Run("0.0.0.0:8080")
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func getClient(collectionName string) *mongo.Collection {
	host := "host.docker.internal" //"192.168.122.220"
	port := 27017

	clientOpts := options.Client().ApplyURI(fmt.Sprintf("mongodb://%s:%d", host, port))
	client, err := mongo.Connect(context.TODO(), clientOpts)
	if err != nil {
		log.Fatal(err)
	}

	// Check the connections
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}
	collection := client.Database("sopes1").Collection(collectionName)
	fmt.Println("Congratulations, you're already connected to MongoDB -" + collectionName)
	return collection
}

func createEntity(c *gin.Context) {
	var newCar car

	if err := c.BindJSON(&newCar); err != nil {
		return
	}

	collection := getClient("cars")
	insertResult, err := collection.InsertOne(context.TODO(), newCar)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Death Star had been inserted: ", insertResult.InsertedID)
	c.IndentedJSON(http.StatusCreated, insertResult.InsertedID)
}

func getAll(c *gin.Context) {
	brand := c.Query("brand")
	model := c.Query("model")
	color := c.Query("color")

	var results []*car
	var filter = bson.D{{}}

	if brand != "" {
		filter = append(filter, bson.E{"brand", brand})
		println("brand")
	}
	if model != "" {
		intVar, err := strconv.Atoi(model)
		println(err)
		filter = append(filter, bson.E{"model", intVar})
		println("model")
	}
	if color != "" {
		filter = append(filter, bson.E{"color", color})
		println("color")
	}

	collection := getClient("cars")

	cur, err := collection.Find(context.TODO(), filter)
	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.TODO()) {
		var s car
		err := cur.Decode(&s)
		if err != nil {
			log.Fatal(err)
		}
		println("que pazo")
		results = append(results, &s)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.TODO())
	fmt.Printf("Found multiple documents (array of pointers): %+v\n", results)

	c.IndentedJSON(http.StatusOK, results)
}

func updateEntity(c *gin.Context) {
	registration := c.Param("registration")
	var updateCar car

	if err := c.BindJSON(&updateCar); err != nil {
		return
	}

	collection := getClient("cars")
	filter := bson.D{{Key: "registration", Value: registration}}

	updateResult, err := collection.UpdateOne(context.TODO(), filter, bson.D{
		{"$set", bson.D{
			{"brand", updateCar.Brand},
			{"model", updateCar.Model},
			{"series", updateCar.Series},
			{"color", updateCar.Color},
		}},
	})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Matched %v documents and updated %v documents.\n", updateResult.MatchedCount, updateResult.ModifiedCount)

	c.IndentedJSON(http.StatusOK, "")
}

func deleteEntity(c *gin.Context) {
	registration := c.Param("registration")

	collection := getClient("cars")
	filter := bson.D{{Key: "registration", Value: registration}}
	deleteResult, err := collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Car deleted", deleteResult.DeletedCount)

	c.IndentedJSON(http.StatusOK, deleteResult)
}
