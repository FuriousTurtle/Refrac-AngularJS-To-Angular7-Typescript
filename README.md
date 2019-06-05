# Refrac-AngularJS-To-Angular7-Typescript
Turned a WEBRTC calling app from AngularJS to Angular 7 Typescript


# XiVO Webapp from AngularJS to Angular 7 

Link : [https://github.com/FuriousTurtle/Refrac-AngularJS-To-Angular7-Typescript](https://github.com/FuriousTurtle/Refrac-AngularJS-To-Angular7-Typescript)
This project consist of turning the XiVO calling webapp example (done in AngularJS) into a new example done in Typescript and Angular 7.

# Main differences in-between AngularJS and Angular 7

In the code I had to transform, I've been able to note the following main differences, in order of importance :
* Turning from Javascript to **Typescript**, which adds a lot of security and makes the code way cleaner.
* A lot of **new tools** coming directly from **Angular 7**.
*   **jQuery** is not needed anymore.
* There is **no more controllers**, the whole system is now composed of different types of **modules**, depending on what they are used for.
* The routing is way easier now.

# Let's go into details for each of those differences

## Turning from Javascript to Typescript

The main difference when looking at the previous code and the new one is obvious, Typescript is now the main language. It's basically Javascript with strong typing available for you to set on your variable :
```typescript
var userNickname: string = ‘TheMusk’;
```
It also allows you to create your own **custom types**, mostyle used for objects and arrays :
```typescript
type agent = { agentId: number, agentName: string };
```
You can use that to control your function by **binding each parameter to a type** (even a custom one), which let you know easily what you need to feed to your function in order for it to work. 
```typescript
getAgentConfig = (currentAgent: agent) => { console.log(currentAgent.agentId) }
```
Note that moderns IDE usually works with Typescript and are capable of displaying the type of a variable / parameter on mouse hover, as well as the structure for custom types.

## A lot of new Angular tools
There is way too much of them to have a complete list, but here are the most important **upgrades** that I had to use :

The **$ scope** tool is not used anymore, we use the keyword **this** instead. That makes us able to bind a whole **ecosystem of variables for each one of our modules**, which can be accessed by the DOM by using the keyword **public**, or make it hidden from the DOM by using the keyword **private**. Every single function from each module can be called inside of itself with the keyword **this** .
```typescript
public userId: number = 9203;
console.log(this.userId)

private apiKey: string = ‘hfjshfJFHSDFIUZiljzf92384jfdz920jfieJIFL’;
(this.apiKey == ‘uaiozueroia8209OAZI’) ? this.sendApiKey(this.apiKey) : console.log(“La clé API est invalide”);
```
**jQuery is now useless**, we use **ngModel** to bind and dynamize the DOM, so we can produce a full HTML page without a single ID.

**Importing** external Javascript / Typescript files and libraries is now **way easier and cleaner**.

The **constructor function** of each module is infinitely lighter, and is now actually used to construct, as we now use it to take outside stuff like **libs and external files** and put them into our module, and also to setup **event handlers** and that kind of code.

 **Controllers don't exists** anymore, we now only create modules which are, most of the time :
* **Components**, with a typescript file to **call external functions** (mostly provided by services), and an HTML / CSS file combo to display it on the webapp.

* **Services**, which contains **functions** that are called by Components. Those are just Typescript files that contains **pure logic code**. It's the **core code** of the webapp.

# The steps I've done to reach that result

I started by **rebuilding the controller**. I generated a component using the **ng command** (from angular CLI, link at the bottom of the doc), and I copy pasted the AngularJS controller code into my newly generated component. I took every single variable off the constructor and declared them below it, **using public / private keywords and types to make them fully "Typescripted"**. I also created custom types outside my class to have accurate object typing.

I also took **every single function off of my constructor** and put them below it, inside my class, using the brand new **ES6 arrow function**. Then I **typed** each function parameter to make the code more secure and easier to understand. The **event handlers** must be set into the constructor so they are working as soon as the component is needed.

I completely rebuilt the **ajax** function, using the **HttpClient** angular tool (it's my logMeIn function), and I declared my HttpClient into my app's **typescript module file** so I can use it where it's needed. 

I turned the jQuery of this same function into an **ngModel** system. I created every variables I needed into my component and I used the **[(ngModel)] banana case** to turn it into a **two-way binding** in-between the DOM and my component, making jQuery **useless**.

I imported my **Cti.js file** in my index.html, It's supposed to be a service but it's too much work to turn it from it's current state to what I needed it to be. I **imported it** into my typescript component (that's not how it's supposed to be done, but I couldn't use it as a service) and I made it usable by **passing it in my constructor**.

Then I decided to **separate the login part**, and turn it into a component on it's own. It'll show itself on my webapp before accessing to the calling component. (Creating it via the ng commands made it easy and did all the work for me, but you have to declare each one of your component in the app.module file in order to use it).

#### Then I checked if everything was correctly set up and working :

##### Layer 1 (index)
* **My file index.html** contains my **app-root tag**, which will display my webapp on the browser.

##### Layer 2 (App)

*   **The component file** of my webapp contains my **app-root tag** to link my **index.html (>Layer 1)** with my webapp.
*   **The module file** of my webapp contains every single one of **my components (>Layer 3)**, with every **imports** that those components needs.
*   **The app-routing file** of my webapp contains **a route for every single one of the component I wanna use (>Layer 3)**, with an **url path** for each one of them.
*   **The HTML file** contains the **router-outlet tag** which will **retrieve the component (>Layer 3)** pointed out by my **app-routing** file as well as everything around this router tag (a good place to put a header !).

##### Layer 3 (Components, services...)
* **Every single one of my typescript files** contains every single **imports I need**, retrieved in the **import list of the app.module file (>Layer 2)**

**Every single one of my layer** is linked by the various **tags and imports**, and the display order is set up by the **router**. The link overview is pretty easy to understand. 

# Sources and useful links :

*    [https://angular.io/guide/ajs-quick-reference](https://angular.io/guide/ajs-quick-reference)

* [https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

* [https://www.dyclassroom.com/typescript/typescript-alias-for-custom-types](https://www.dyclassroom.com/typescript/typescript-alias-for-custom-types)

* [https://cli.angular.io/](https://cli.angular.io/)

* [https://www.typescriptlang.org/docs/home.html](https://www.typescriptlang.org/docs/home.html)

* [https://angular.io/docs](https://angular.io/docs)
