# PerVer - Personal Management App
## user management system built with React and Bootstrap.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Here's a brief overview:

## Description

The application is divided into three main sections: header, main, and footer. 

The header contains a navigation bar, which includes a search bar. The search bar allows users to filter the list of employees based on their input.

The main section displays the application's content. It includes a title and a `ParentComponent` which receives the search string from the search bar as a prop.

The footer contains additional information or links.

## Installation

### Docker-Containerisierung / Image Erstellung: 

- Containerisiert die Personalverwaltung-Anwendung mit Docker. Erstellt ein  Dockerfile, das alle notwendigen Schritte zur Erstellung eines Docker-Images der  Anwendung beschreibt. 

```dockerfile
FROM  node:14

# Set the working directory in the Docker image

WORKDIR  /usr/src/app

# Copy package.json and package-lock.json

COPY  package*.json  ./

# Install dependencies

RUN  npm  install

# Copy the rest of the code

COPY  .  .

# Build the application

RUN  npm  run  build

# Start from the official Nginx image

FROM  nginx:1.21

# Copy the build output to replace the default Nginx contents.

COPY  --from=0  /usr/src/app/build  /usr/share/nginx/html

# Expose port 80

EXPOSE  80

# Start Nginx

CMD  ["nginx",  "-g",  "daemon off;"]
```

### Docker-Image erstellen und  lokal ausführen

Um ein Docker-Image aus einem Dockerfile zu erstellen, kannst du den `docker build` Befehl verwenden. Hier sind die Schritte:

1.  Öffne ein Terminal.

2.  Navigiere zum Verzeichnis, das dein Dockerfile enthält.

3.  Führe den folgenden Befehl aus:

```bash
docker build -t dein-image-name .

docker  run  -p  8080:80  dein-image-name
```

Ersetze dein-image-name durch den Namen, den du deinem Image geben möchtest. Der Punkt am Ende des Befehls gibt an, dass das Dockerfile im aktuellen Verzeichnis liegt.

Nachdem der Befehl ausgeführt wurde, sollte dein Docker-Image erstellt und lokal auf deinem Computer verfügbar sein. 
Du kannst das mit folgendem Befehl überprüfen:

```bash
docker images` überprüfen.
```

![Webapp on Localhost](https://lh7-us.googleusercontent.com/0gtTynOsjQwzqiXzC4WSoEQ5yIVaoBPM25oGyzyFW7-ujSEI_1lWTRdL1yMUG8P8BcdODZal676QskBcA3vsep3H6Rv6VBAbTsK1-uLX12DNcI5k17UaELampiei6ZFQNLf88o-99TxtZ4byMKRKGCI)

### AWS Elastic Container Registry (ECR): 

- Richtet ein AWS Elastic Container Registry (ECR) Repository ein, um das Docker Image der Personalverwaltung-Anwendung zu speichern. 

1.  Öffne die AWS Management Console und navigiere zum ECR-Dienst.

![](https://lh7-us.googleusercontent.com/0d_dmWD4cn-toC5VXhCUlvZNxkNdWJs9E5Y0TZKa7321eF_OWk4qz0WweBU7NI_rnAejhowcOqLv9E_3eiBy7X-fKxybw_wvRrBNi37iItNWfwEVYTo0-MIU0PZKzzkQkuBOtZIoWxBwBBWdemNY2Dw)

2.  Klicke auf "Repository erstellen".

3.  Gib einen Namen für dein Repository ein, z.B. "personalverwaltung".

![](https://lh7-us.googleusercontent.com/_GiamI47QM4lUaVNv2aI58OoQqudMHTnWAiVYTfhyinI_rQcQRsQyhvgTHVQAM7XitjIPXjSAPYhaL4XgCWGpbSvwhmZBChqqBktGdAeFhWs_99C0JzdHamgKPUhasj-5SjX9m20cZOO7wGUT4K7UXE)

1.  Wähle die gewünschten Einstellungen für die Tag-Immunität, Scan bei Push und Lebenszyklusrichtlinien.

2.  Klicke auf "Erstellen".

![](https://lh7-us.googleusercontent.com/DzmYo2Yuzc0Xm_A-52CIrD00rz3Ae9ztR-ORPVklXn-o0gHvEiZ1PlPQD3ekjNEBzTcNHhfGZrPGs4vij9QetWBBJ-u8_5xRGnDUMM2bF_v3SlqQA66WhOx98fBRGE0jXqIrPB7HG5Fur5MIfhinxfY)

#### Um ein Docker-Image in das AWS Elastic Container Registry (ECR) hochzuladen, folge diesen Schritten:

1.  Installiere und konfiguriere die AWS CLI. Stelle sicher, dass du die richtigen Zugangsdaten verwendest (ACCESS Key, Secret Access Key und Session Token)

![](https://lh7-us.googleusercontent.com/C_p1HQGK-lByD8PVRVcxOFmU3XOoipzUUTuMrT0yD4UHrvtngA0M3gldXcbNY5GmBVRW0w3a_W47Gasi9PgypVESPb1FALBJxCHitjJ3LW0zT3S7sJjgSSpVDDytT4AKsOaudWN9JJH8ivZRCa9y1Cs)

![](https://lh7-us.googleusercontent.com/-yM3uUpnA9s6X_i5X0Aa0rhgAXlp0SvNCNV2QegTcxp7E52BkVcZ10k6FBZg3svBmSkuRazN_GKv4bKZ91Lvno6JeIWZGsCpFKGOudDwxkZIgivtTOZlKOSAIqtzzJQ8M6OzEOqN-VhfjeQOVyI-yyA)

2.  Baue dein Docker-Image mit dem `docker build` Befehl. Du musst einen Namen für dein Image angeben, z.B. mein-image:

```bash
docker  build  -t  mein-image  . 
```

3.  Melde dich bei deinem ECR-Repository an:

```bash
aws  ecr  get-login-password  --region  region  |  docker login  --username  AWS  --password-stdin  deinRepositoryUri`
```
(Ersetze "region" durch deine AWS-Region und "deinRepositoryUri" durch die URI deines ECR-Repositories.)

![](https://lh7-us.googleusercontent.com/UU2nsh0OfIzouwFfGKttSxDlhaJjUj8N7XgsdEuXkrZzf99Vj_KJSNPFBLaD8vaSHkvOkUPR1TxcpM0ZW_MBoRoJaFSMJ_AqT0jpnT9gvKMbrLNPgMfRYIUXCcmisZN0fbY67FW3f3xvmvxCnP1RRRo)

4.  Tagge dein Docker-Image mit dem Tag deines ECR-Repositories:

```bash
docker  tag  mein-image:latest  deinRepositoryUri:latest
```

![](https://lh7-us.googleusercontent.com/BF1_6aErvVFsIaHW_YdWWmzdBkQYQ3glGvLcb6Wue9fVaG3Y-HyIvCp8iDbKVzB66VoGRx4IkJpbJ-nqvjy4wqpNNPvePde7IYWAGmhWmf4jt37zgsFNdrOtOxUARr2Pgx5FGT71NBiLKgRwEUcJ9pY)

5.  Lade dein Docker-Image in dein ECR-Repository hoch:

```bash
docker  push  deinRepositoryUri:latest
```

![](https://lh7-us.googleusercontent.com/k2oZYnR2j55AvlVQbCLphYD-gbxL8wjk85VyEQq_C9bP4dyrOBcveitax_oKkMWw0d-ZwnYTzYA-_vSxa6EZZusY4Za8_dW1f56SA2aahjpQRpd8ffcolA_yM9u5ik0QSKzwNvJROy7LMFjn_vtuJGQ)

Jetzt sollte dein Docker-Image in deinem ECR-Repository verfügbar sein.

![](https://lh7-us.googleusercontent.com/sneSJdQ5yAPEZDgKI60V3LMsFbmTT3qKfe6YG1eHfd5qkb6d36ee8DwVo2rrBM1DedRC6yqg41-XUP18HPXibmZ6Z_YxI2_fcpdHtPN59r3vqj0ioon1dM4ScL3ZFrMNRJ640xlQSsUg46ht4OmTh5U)

### AWS Elastic Container Service (ECS) Deployment: 

- Deployment-Szenario unter Verwendung von "AWS Elastic Container  Service (ECS)", um die Personalverwaltung-Anwendung in der Cloud laufen zu lassen. - Verwendet "AWS Fargate", um die Personalverwaltung Anwendung in der Cloud laufen zu lassen. AWS Fargate ermöglicht es, Container ohne die Notwendigkeit, Server zu verwalten, zu betreiben.

- Konfiguriert ECS-Fargate-Cluster so, dass es mindestens drei Instanzen eures  Containers ausführt. Dies stellt sicher, dass die Anwendung hochverfügbar ist und  die Last effektiv bewältigen kann, besonders während der Spitzenzeiten in der  Weihnachtsperiode.

Um deine Personalverwaltung-Anwendung mit AWS Elastic Container Service (ECS) und AWS Fargate zu betreiben, folge diesen Schritten:

1.  Erstelle ein ECS-Cluster: 

1.1  Gehe zur AWS Management Console, navigiere zur ECS-Seite und erstelle ein neues Cluster. Wähle den "Networking only" Modus, der von Fargate unterstützt wird.

![](https://lh7-us.googleusercontent.com/bH7xmbjdRmNzUvGDmVwZhUjU7Uk9cEUj-Qn-V-gO-5R3bIqVatx8PywyOmXciD5sV5y3eJ50ibRoUIsXtOVah0l_x4vHn1mP-8frl5zDXnc0b3WdKHAGNc5cJF7h0mulo2i7TqO-ucrxBzqlg0Lokno)

![](https://lh7-us.googleusercontent.com/8iXdBQDWx3ummuHqjmF8YAEuNtElUQxcaLxxIBypT6gjElEBFU05A10lJ4D3StQx_2I6qunafk2nYMNZdjyJgGgo8FBjNaU5VKtwgGZzW0LmZUg_UxumkDF5WqwkLbKfchT11lqNLG3mF2Ng63xQdCk)

![](https://lh7-us.googleusercontent.com/F8oXHnSy0mf2aOLocmO85p2q8BIi-vJxi3k4MytCywR7nV6c0XMnMjuJ6Gfoom4SP4PFki4nwO_hE7sWH9f1HMUJuYGGBHst4d4MVvwbP3x0lIThEvh_Vq_UqOpAsA2mTuUbrf4q0NXJ7DSTZH3T480)

2.  Erstelle eine Task-Definition: 

2.1.  Eine Task-Definition beschreibt, wie deine Anwendung ausgeführt werden soll. In der Task-Definition gibst du das Docker-Image an, das verwendet werden soll, die benötigten CPU- und Speicherressourcen, den Netzwerkmodus (awsvpc für Fargate) und andere Einstellungen.

![](https://lh7-us.googleusercontent.com/dpFedP4hsJLefgJaEKyx4zNibIea9SB3vfkpYwmicNE6PQ-63Y58F6gAna9HBhvpnOLWh5FLHyClUF_ZEKr8CXXzSa0Y1wXMh5yOwPQF2-7dd7HlBL7eiw0P1D70_l6TpJiizZgSj413whwlE0RfhOM)

![](https://lh7-us.googleusercontent.com/6xaZsP3k5w34vFQbyLVTuJeRXx8fO8S9ko50FloPrh6x5mH7bHvI-QKFZ8cfjfUuXIhVGYRF93_ebgq9YrcimdptDsOSn63mDY3lXHNbhxg7OzrtqoD-p5GmqjSQBYMqTLllW05RK7bzHBYnsQG8MWM)

![](https://lh7-us.googleusercontent.com/KWgJtfY8TX2fCNrPisvVzzk4OJLKWmE7yiGMfk05-fLE_yxcNemVrlrC0MT8Gpq2njMw2YlC58rxq_EDRfYT5rRmF6J63RCm4BWJO7GSEy2ViL9zGvd0-ibtqXgyElLlgtxX8UijCCMOr_bbiUG6zeU)

-   Kopiere die URI zu dem Repo in ECR

![](https://lh7-us.googleusercontent.com/1pm7b5-5tv8wso4UplctPQzOTTunGGTSGMLsZHwXZVWSnOl6b_--o9bQmYdknnUxFYCmtEii0W-0exAoxGriw8npLPivRQwYbXgdMwFBjM0T3iQlEB1dYAJ_dOIPdaw1jwdWFsGI6SgklQAynS9IlvE)

-   Füge die URI den Container Details hinzu

![](https://lh7-us.googleusercontent.com/1BW9SrZQ8OvL6l454Taurh-U-LZbWfPapAwVZjINgk-tp4w4-5JVX76TpGDor6aH7hWIYzOqxHxO7Pd8yhjkoT8bAg_U4XzKxgrig3SmEGKhLmX8hgRg1koTdRqWhbNI5_9xRVt_2d2xErB_fPa0x14)

![](https://lh7-us.googleusercontent.com/OsSHgIiKv17OSqN1CbSOEyc3vEoum2GR6WWMmlKhkpLQnmGgIeRDsXsnt2agDtd7k6RkiVDCDMJLUghPPu47QfMmKOZ7joV9cZgbyxYTrZOt0VYXnlWbK-zAGdy51Xd2VD1xOo6yhe6gxN8xpOjs0xE)

3.  Erstelle einen Service: 

3.1.  Ein Service sorgt dafür, dass eine bestimmte Anzahl von Instanzen deiner Task-Definition im Cluster ausgeführt wird. Wenn du den Service erstellst, wählst du das zuvor erstellte Cluster und die Task-Definition aus, gibst die gewünschte Anzahl von Tasks an (in deinem Fall mindestens drei), wählst den Fargate Starttyp und konfigurierst das Netzwerk.

![](https://lh7-us.googleusercontent.com/yG9ZUtIKFbwrnjp46E72Erj3h3-jQAsS6udKdnAbEIefv0352SaHO_KuCULawVSSb93bUc030vDFDZcmrPMoY6QiNjtP7X9M-bk8VR1RbJFREXlsNhhF3SXcp_wt3xAHXJN0psnDypX9mw9k5K4Odcg)

![](https://lh7-us.googleusercontent.com/-A9PEmUUXtYXtNlpa_DW54CiFZelQlr4-ezrdv8YDOL__uc_fE3uaA1W4f8NmqHQGGRaQYX_O34KKHRkZ5gXcXsGrRMtKnT2Wnu4RQgxNlTL01nOhUphAMPQrcMND1sif6kh1HbaJRtO_x3oTluYltU)

![](https://lh7-us.googleusercontent.com/5SRaP3EJSpX9GmujgQ6WP7rBhvoGmdBU2d2zjx_g2T0BcWjm-dVniYVuMnCre0zYNyuWGtMEaoI1LazWnG4CXRBtNq2jnLcUIXsQtOcK8TaxxjPgHr8P_5NqQPTLIwVkDyhyfG15DafH3715L7YHBmo)

![](https://lh7-us.googleusercontent.com/ySBcwIek0qoPDwht-Qg9ZJZG_FOz4bnjFHYR6IKUnNAr3NsvXwQ0eLhAeYG-wMbg7K5SUrLT2GhUYE9-hFr0B8746aWutQq6qPBWK8hnoiN39VuzKRNAPZW6BnvgZEqNwGPv2xJCPmKgOZLC6UQ6mjo)

![](https://lh7-us.googleusercontent.com/M3HwM4z4Afuy4tuMcXsUt12MHeDlFptrEzeWgJknEZVDeuHh28d5_BeEucVVfxT-Lil-2mhvp-T18JN2zGd_nyvlFYiF5Om473TFX9mXkrD3eP79RMVZrrxjavmL0ISxSpfJMXa99mxW9Fc5SpdJkc8)

-   unter der in Amazon Elastic Container Service / Clusters / <Clustername> / Services / <Servicename> / Tasks / <Task-ID> angegebene public IP Adresse kann die App im Browser geöffnet werden

![](https://lh7-us.googleusercontent.com/zrKNuRfdamkju-ywUEWe7_M8Xe6v4LpP05BhO4CaUYiz4EDkoj4dsYWMQx-nMpR-ZOP73b39k-pXhLucaNDEEARv3GaBToAWGG-u72medneo99GypyJgCec9GR7Na4HOvUMzlGaGD2dau5cCHlxPCSc)

### (Optional) Load Balancer hinzufügen

Um die Last der Datenverbindungen für Ihren ECS Fargate-Dienst zu verteilen, können Sie den von AWS bereitgestellten Dienst Elastic Load Balancing verwenden:

1.  Erstellen Sie einen Load Balancer: 

1.1.  Gehen Sie zum EC2 Dashboard in der AWS Management Console, navigieren Sie zum Abschnitt "Load Balancers" und erstellen Sie einen neuen Load Balancer. 

![](https://lh7-us.googleusercontent.com/6Jw1YATi8HyUOFTQPUWV14dXEPU1AsphjozPaHjZnJRQ7Mc-xvxhzxt0200jhMUFTUJH5wL3NJPWZo-D5G-6G9-OcAkHtN0lwwcXCecYGRhj60PBrK1JTUWVLG-11Cv7wbVF0qcXTQrZCo3I2Gpt4Wo)

Konfigurieren Sie den Load Balancer: 
Während des Erstellungsprozesses müssen Sie die VPC und die Subnetze angeben, in denen Ihre ECS-Aufgaben ausgeführt werden. Außerdem müssen Sie die Sicherheitseinstellungen konfigurieren und eine neue Sicherheitsgruppe erstellen, die eingehenden Datenverkehr auf dem Port zulässt, auf dem Ihre Anwendung läuft.

![](https://lh7-us.googleusercontent.com/pTiiwxHga4p8BQwoDo3yIrWSjVJtU8x7IoySCBMXBnX8yNr7dyitEpucv6XpBaS4QU5FrZBNQP13UAWu1iZjy5xhFn9aFGQh7SpVee1MpvSmuQ7zMK01JDWcLaSJ0Ldi720TmGtqdP7yv5UvyektCOc)

![](https://lh7-us.googleusercontent.com/R4zINPW5YxF1iVrzbhsOThSCokYRaoqhpabZHJf2i8BhcmxynDM83kX8DVPBFWlFbszN2cHpY7Mxi9nJj1-2o8xa0vsLAOHhhGVsVCTAHAxMQ82-s2kxH7WzPh4hhAOFplgxysFjJlYcblJ46KJOL2U)

![](https://lh7-us.googleusercontent.com/qzuBI5lPOhpdUelwNMIZ9jkI99dXIW7FAIgLK3BkQQreUsuh7wL7JNmbfXjBqWisZglz9CCfGuFrn5iZ8mBWV5Ohbon17XXrmtVTa0wY5sD3JpuPg-Y_wGSM57tjpnr5xud6kUGZMF6-mUBPkJp1I0U)

![](https://lh7-us.googleusercontent.com/fbDikQe36o_p0GFzsvWa5uXoBm-iVz04Dw2dX9xcwWcHBwFko_w9jnlkLdenH8jg-eLGbBGBURdvOn-dXtOQiPCDux2qEy3FbVbEThijqpgHKkHmM2_Wwja-VsIwON_gpfU7yDQhnU-UZNlDwkINAew)

Erstellen Sie eine Zielgruppe: 
Eine Zielgruppe teilt dem Load Balancer mit, wohin der Datenverkehr geleitet werden soll. Wenn Sie eine Zielgruppe erstellen, müssen Sie als Zieltyp "IP", das Protokoll und den Port angeben, auf dem Ihre Anwendung läuft.

![](https://lh7-us.googleusercontent.com/AZkUdUHHsLZ1oeDtqOfEizlC0eyqRTVrx3TVfBuw0j5poLyvHWPxWo_YtPB6vssRZSuV_4Ugk7regvabinXkH_-DGPVMZfLCl9-qsiCrwLmajtuFX6VxdNpKrQXNxNKQ10is1NoN1zeKS_pWBCp3ZkU)

![](https://lh7-us.googleusercontent.com/E1sDF1LFT93dkQaDoUkkE1rWhUNDp_BYKAww_04QHBw_vyR6I8tASZHTviDcmcQibKwtAvm3KMPcrX91ADidh_GoeAWN53FqibHNWVQ5f8S4GFxnXe8-cXF-Rdu-uuYgVewQQrI5tbzEm79sHnlcUUs)

Ziele registrieren: 
Im Falle von ECS Fargate werden die Ziele automatisch von ECS registriert und deregistriert, wenn Aufgaben gestartet oder gestoppt werden.

Konfigurieren Sie den ECS-Dienst für die Verwendung von Load Balancer: 
Wenn Sie Ihren ECS-Dienst erstellen oder aktualisieren, können Sie den zu verwendenden Load Balancer angeben. Dazu müssen Sie den Namen des Load Balancers und die von Ihnen erstellte Zielgruppe angeben.

![](https://lh7-us.googleusercontent.com/wklEW_4yjVjgTlNyyl_qJdAmXnnSReBTkSQ0w4uFho5jlv03epeUBOjzjfbp6jk5OeW46gJ4_9xoFjPpv718dUCl_Jt01er7ipJyrl7coacUEHjG-gdVKpCd587noKXPqqVorvVGX-NBsWXjk0Fi1uI)

![](https://lh7-us.googleusercontent.com/n_btNimFB-yKj6B2CtHFCF3tRWcPJb24vuIx5YiIomYRZkxYR-3H3K_0JTQjDXDPft497rvBc4r72nJcVs-7MlEcfwZ81XoM2OAbjenIVxuxyDLtxF7FVh21MS2rP6noN921sC_zM7cYR3xc_VEFvsQ)

![](https://lh7-us.googleusercontent.com/_735E9Ul-IR57V4ofPMjs8WVfOJY6o1-ikH3KT5n_7OwOXcqSnQZ7zDcbkYP4aTtirkMcGbCtftJDP0G6LV8yimDkw3EfUJMtnEHYe71tt1KcX2Z6liLjWHQKiz7U3fmTIziF4y6c223vJjSau9cbwM)

![](https://lh7-us.googleusercontent.com/Ta9Qp8eqBGNv8vSUWdGGdwiXG_algTxA_IvL36TQukf5diyJT4hzl7aINCkMfkzOXyxXs2K2K1YKDiBOJZo30lf82MvEGGa0BSZfL2QvWxWCe4wbOoDZJE2taF5mzjYBZEyvq7I8Z0-ePqUTC2UiRIM)

![](https://lh7-us.googleusercontent.com/nhEu-T8zChZue4W9GHSzA6MzpUz0DW8kcX7x3Olv8oWVmTEeHBtE_lEpaPmhpFRPTdTgDQy1kIAlR_SjGO-Dh-SGn5MfnjJ9Ss-6CCJ70RfUhcV5qn4jZVdvtEHZHncEdAmpys8GXj6Vlkw0QydCuiU)

![](https://lh7-us.googleusercontent.com/Bc9Vp9nRj1PL69cudOAUK9IeqZePIxJ4GTIdNzVSzJ9RLd2Wc-DZHYS1hyKJErVfQudjJfql87LjrIPZ7GjGBWpI7jlL1JoGH72_QSM6HkCW4fpNv3qceroafUWDIlrkXnhG8LlC0hGg4YsmFdUf740)

Sobald Sie den Load Balancer eingerichtet haben, wird er den eingehenden Anwendungsverkehr automatisch auf mehrere Ziele, z. B. ECS-Aufgaben, verteilen. (Erreichbar unter der DNS Adresse des LB)

![](https://lh7-us.googleusercontent.com/RXqnmkyyjo5vH3MmxGqMw2TJQE_gO8RfA_rYgGUlcp9U0EVFPC1HMRSuqe6A_wDqpFZgJgnlM9EY4ILlOWjGzT1CZ_yqFv1lguXtfZ7hi-AvCfm8ePvItZ6Oa6N2N3onBYgdvWPPE_FRgI5icwbyIuI)

![](https://lh7-us.googleusercontent.com/nsoP7IMD4_KrdJlmcon2LT-l-8pKthx9K_qv9jnTRQH5MKLWsFhnLVbgwpWL3kgEniin2xn2Iv76FF6Tp9ttOAWFUS0Q0XxegO0K0tBCrHDmuN6JTd50pCwwxHcN0bs8MbpbOZkM-zM9yRFhQGVIwPA)


- Aktualisiere den Service: 

1.  Jedes Mal, wenn du ein neues Image in ECR hochlädst, kannst du den Service aktualisieren, um das neue Image zu verwenden. ECS stoppt automatisch die alten Tasks und startet neue mit dem neuen Image.

#### Um den Service zu überwachen und zu verwalten, kannst du die AWS Management Console verwenden. 

1.  Auf der ECS-Seite kannst du den Status deiner Cluster, Services und Tasks sehen. Du kannst auch CloudWatch verwenden, um Logs zu sehen und Alarme zu konfigurieren, wenn bestimmte Ereignisse eintreten oder bestimmte Bedingungen erfüllt sind.





Frohe Feiertage und viel Erfolg bei der Containerisierung und dem Deployment!

To install the application, you need to have Node.js and npm installed on your machine. Then, you can clone the repository and install the dependencies:

`git clone <repository-url>`
`cd <repository-name>`
`npm install`

## Usage

Contributing
Contributions are welcome. Please open an issue or submit a pull request.

## Components

### App Component

The `App` component handles the display of the application. It is split into header, main, and footer for semantic reasons. It also manages the state for the search string and passes it down to the child components.

#### Child Components

The `App` component renders the following child components:

- `CreateNavbar`: This component is rendered in the header of the application. It receives the `handleSearchChange` function as a prop to update the search string in the `App` component's state when the user types in the search bar.
- `ParentComponent`: This component is rendered in the main section of the application. It receives the `searchString` as a prop and uses it to filter the list of employees.

#### Structure

The `App` component returns a fragment that includes a header, main, and footer. The header contains the `CreateNavbar` component. The main section contains a heading and the `ParentComponent`. The footer contains the `Footer` component.

### ParentComponent

The `ParentComponent` is the parent component of the main section of the website. It maintains the state of the employees object and passes the data to the child components.

#### Child Components

The `ParentComponent` renders the following child components:

- `CreateUser`: This component is rendered when the current path is '/create-user'. It receives the `employees` state and the `setEmployees` function as props.
- `UserList`: This component is rendered when the current path is '/user-list'. It receives the `filteredUsers` array, the `deleteUser` function, and the `handleSave` function as props.

#### State and Effects

The `ParentComponent` maintains the state for the employees object. The initial state is retrieved from the localStorage or set to an empty array if the localStorage is empty.

The `ParentComponent` also uses the `useEffect` hook to save the employees object in the localStorage whenever it changes.

#### Functions

The `ParentComponent` defines the following functions:

- `handleSave`: This function is triggered when the save button is clicked. It updates the state of the employees object with the edited user.
- `deleteUser`: This function deletes a user from the employees object. It is triggered with a confirmation dialog and the id of the user to delete as parameters.

#### Props

The `ParentComponent` receives the `searchString` prop from the `App` component. It uses this prop to filter the employees object and create the `filteredUsers` array. This array is passed to the `UserList` component.

### CreateUser Component

The `CreateUser` component provides a form for creating a new user. It receives an array of employees and a function for setting the employees as props from `ParentComponent.js`. It maintains its own state for the new user and calls the `setEmployees` function with the new user when the "Add Employee" button is clicked.

#### State

The `CreateUser` component maintains the following pieces of state:

- `vorname`: This state holds the first name of the new user.
- `nachname`: This state holds the last name of the new user.
- `email`: This state holds the email of the new user.
- `abteilung`: This state holds the department of the new user.
- `address`: This state holds the address of the new user.
- `geburtstag`: This state holds the birthday of the new user.

#### Functions

The `CreateUser` component defines the following function:

- `handleSubmit`: This function handles the submit event, creates a new user, adds the new user to the employees array, and clears the input fields.

#### Props

The `CreateUser` component receives the following props from the `ParentComponent`:

- `employees`: This prop is the array of employees.
- `setEmployees`: This function sets the array of employees.

#### Returns

The `CreateUser` component returns a form for creating a new user.

### DeleteUser Component

The `DeleteUser` component provides a modal for confirming the deletion of a user. It receives the user details, a function for deleting the user, a boolean for showing the modal, and a function for setting the modal's visibility as props from `UserCard.js` and `UserList.js`. It calls the `onDeleteUser` function with the user's ID when the "Delete" button is clicked.

#### Functions

The `DeleteUser` component defines the following function:

- `handleDelete`: This function calls the `onDeleteUser` function with the user's ID and hides the modal.

#### Props

The `DeleteUser` component receives the following props from `UserCard.js` and `UserList.js`:

- `id`: This prop is the ID of the user to be deleted.
- `vorname`: This prop is the first name of the user to be deleted.
- `nachname`: This prop is the last name of the user to be deleted.
- `onDeleteUser`: This function deletes the user.
- `show`: This prop determines whether the modal is shown or not.
- `setDeleteShow`: This function sets the state of the modal.

#### Returns

The `DeleteUser` component returns a modal for confirming the deletion of a user.

### UserList Component

The `UserList` component receives a list of employees from the state in `ParentComponent.js`. It creates a list of `UserCard` components and displays them by iterating through the employees array.

#### Child Component

The `UserList` component renders the `UserCard` component for each employee in the employees array. It passes the employee's data and two functions to the `UserCard` component as props.

#### Functions

The `UserList` component defines the following function:

- `employeesList`: This function creates a list of `UserCard` components. It is called in the render method of the `UserList` component.

#### Props

The `UserList` component receives the following props from the `ParentComponent`:

- `employees`: This prop is an array of employees.
- `onDeleteUser`: This function is passed to the `UserCard` component and is triggered when the delete button is clicked.
- `onSave`: This function is passed to the `UserCard` component and is triggered when the save button is clicked.

The `UserList` component passes the following props to the `UserCard` component:

- `id`, `vorname`, `nachname`, `email`, `abteilung`, `address`, `geburtstag`: These props are the details of the employee.
- `onDeleteUser`, `onSave`: These functions are triggered when the delete button and the save button are clicked, respectively.

### UserCard Component

The `UserCard` component displays a user card with the user details using a card from react-bootstrap. It receives a user object and two functions as props from `UserList.js`, maintains its own state for the edit and delete modals, and calls the `onDeleteUser` and `onSave` functions when the respective buttons are clicked.

#### State

The `UserCard` component maintains two pieces of state:

- `showEditModal`: This state determines whether the edit modal is shown or not.
- `showDeleteModal`: This state determines whether the delete modal is shown or not.

#### Child Components

The `UserCard` component renders the `EditUser` and `DeleteUser` components when the respective modals are shown.

#### Props

The `UserCard` component receives the following props from the `UserList` component:

- `id`, `vorname`, `nachname`, `email`, `abteilung`, `address`, `geburtstag`: These props are the details of the user.
- `onDeleteUser`, `onSave`: These functions are triggered when the delete button and the save button are clicked, respectively.

The `UserCard` component passes the following props to the `EditUser` and `DeleteUser` components:

- `user`: This prop is the user object.
- `show`: This prop determines whether the modal is shown or not.
- `setShow`: This function sets the state of the modal.

### EditUser Component

The `EditUser` component provides a form for editing user details within a modal from react-bootstrap. It receives a user object, a boolean for showing the modal, and two functions as props from `UserList.js`. It maintains its own state for the edited user and calls the `onSave` function with the edited user when the "Save Changes" button is clicked.

#### State

The `EditUser` component maintains one piece of state:

- `editedUser`: This state holds the user object that is being edited.

#### Functions

The `EditUser` component defines two functions:

- `handleSave`: This function calls the `onSave` function with the edited user and hides the modal.
- `handleChange`: This function handles changes in the form and updates the `editedUser` state.

#### Props

The `EditUser` component receives the following props from the `UserList` component:

- `user`: This prop is the user object that is to be edited.
- `show`: This prop determines whether the modal is shown or not.
- `onSave`: This function is triggered when the save button is clicked.
- `setShow`: This function sets the state of the modal.

#### Returns

The `EditUser` component returns a modal with a form for editing the user details.

### CreateNavbar Component

The `CreateNavbar` component sets up a navigation bar with a search function and links to other components. It receives a function as a prop from `ParentComponent.js` to handle the search event.

#### Function

The `CreateNavbar` component defines the following function:

- `onSearchChange`: This function is triggered when the search input changes.

#### Props

The `CreateNavbar` component receives the following prop from the `ParentComponent`:

- `onSearchChange`: This function is triggered when the search input changes.

#### Returns

The `CreateNavbar` component returns a navigation bar with a search function and links to the "Create User" and "User List" components.

### Footer Component

The `Footer` component displays the footer of the application. It includes the company name and copyright year, social media icons, and contact information.

#### Returns

The `Footer` component returns a div containing:

- The company name and copyright year.
- Social media icons for GitHub, Instagram, YouTube, and Google.
- Contact information, including the company name, address, and phone number.

#### Usage

The `Footer` component can be used in any component that requires a footer. It does not receive any props, so it can be used as is:

```jsx
import Footer from './Footer';

function App() {
  return (
    <div>
      {/* Other components */}
      <Footer />
    </div>
  );
}
```

## Install React Routing

`npm install react-router-dom`

## Install React-Icons  
To install the react-icons library, do the following:

In your project folder, open the terminal of your code editor.
Run the command `npm install react-icons` to install the library in your project folder.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

##################################################
#### VPC erstellen
Ich denke, wir wissen wie man eine VPC in AWS erstellt. Falls sie es noch nicht wissen, hier eine Anleitung:
- Zu allererst, brauchen Sie ein AWS Konto. Keine Sorge, Amazon begleitet Sie durch die Schritte, falls sie noch
  keins haben.
- Danach gehen Sie mit dem erstellten AWS-Konto und Ihrem MFA-Authentificator auf die AWS-Sandbox und wählen  die
  Management-Console aus.
- Geben Sie nach erfolgreicher Anmeldung oben links in der Suchleiste VPC ein und klicken Sie danach darauf. Wenn Sie
  den Stern rechts daneben markieren, erscheint es in deiner "Leseleiste".
- Klicken Sie oben rechts auf VPC erstellen (der gelbe Button).
- Dadurch erscheint ein Wizard, wobei Sie folgende Standardeinstellungen ändern.
  Sie klicken auf VPC und mehr.
  Die Anzahl der AZ's passen Sie auf 1 an.
  Private Subnetze brauchen wir keine. Ergo=0
  NAT-Gateways sollte auf 0 sein, ansonsten $$$$$
Jetzt klicken Sie nur noch auf VPC erstellen und wir haben schon ein Netzwerk für Ihre App erstellt.

#### EC2-Instanz erstellen
Wenn Sie noch immer nicht wissen, wie man eine EC2-Instanz erstellt, hier die Anleitung, damit wir Grafana und Prometheus benutzen können.
- Geben Sie in der Suchleiste EC2 ein. Natülich gleich favoritisieren mit dem Stern daneben ;)
- Klicken Sie oben rechts auf den gelben Button "Instanz starten"
- Ein weiteres Wizard erscheint und ändern folgendes:
  Geben Sie einen Namen für Ihre Instanz ein. (es sind nur bestimmte Zeichen erlaubt)
  Wählen Sie am besten die AMI (Amazon Machine Image) Linux 2 aus. 
  Gehen Sie sicher, es ist die T2-micro ausgewählt. (ansonsten $$$)
- Erstellen Sie ein neues Schlüsselpaar, falls noch keines auf dem Computer vorhanden ist.
  Sie klicken zuerst auf neues Schlüsselpaar erstellen und geben den Namen für Ihren KEY ein.
  Der Typ und die Dateiformat sollten auf Windows RSA und .pem sein
  Ihr !!PRIVATER!! Schlüssel wird gedownloadet.
  Bei Schlüsselpaarname geben Sie den von Ihnen erstellten Schlüsselpaarnamen an.
- Netzwerkeinstellungen
  Bei den Netzwerkeinstellungen gehen Sie bitte zuerst auf "bearbeiten" rechts daneben.
  Hier ändern wir folgendes bzw., sollte das in den Voreinstellungen sein:
    VPC: Die vorher erstellte VPC muss hier drin stehen.
    Subnetz: Es sollte eine Public-Subnetz ausgewählt werden.
    Die öffentliche IP !!!muss!!! aktiviert werden,
    Die Sicherheitsgruppe muss folgende Regeln befolgen:
      TYP             Prot Port    Quelltyp Quelle     Beschreibung
      ssh             TCP  22      überall  0.0.0.0/0  beliebig
      http            TCP  80      überall  0.0.0.0/0  beliebig
      https           TCP  443     überall  0.0.0.0/0  beliebig
      ben. TCP-Regel  TCP  3000    überall  0.0.0.0/0  Grafana
      ben. TCP-Regel  TCP  9090    überall  0.0.0.0/0  Prometheus
      ben. TCP-Regel  TCP  7710    überall  0.0.0.0/0
- Klicken Sie nun auf den gelben Button "Instanz starten".

evoila
PS: Es wird 1-2 Minuten dauern, bis die Maschine hochgefahren ist.

#### Prometheus und Grafana installieren
- Verbinden Sie sich zuerst über ssh mit Ihrer Instanz: (hauptsache Sie haben einen Vogel ;) )
- Führen Sie nun folgende Befehle aus:
   sudo yum update -y
   sudo yum install -y docker
   sudo service docker start
   sudo usermod -a -G docker ec2-user
- Trennen Sie die Verbinbdung mit Ihrem Vogel und starten Sie anschließend neu.

#### Prometheus
- Gehen Sie auf https://hub.docker.com.
- Wenn Sie noch kein Docker-Konto haben, erstellen Sie eines.
- Geben Sie in der Suchleiste Prometheus ein und klicken Sie auf ubuntu/prometheus.
  docker run -d --name prometheus-container -e TZ=UTC -p 9090:9090 ubuntu/prometheus:2.46.0-22.04_stable
- Ist Ihr Befehl den Sie lokal für Ihr Image ausführen lassen
- Ihr Image wird nun erstellt.
- Zum Überprüfen führen Sie folgenden Befehl aus:
  docker ps -a
- Geben Sie in Ihrem Webbrowser folgendes ein:
  x.x.x.x:9090 (ersetzen Sie die x.x.x.x durch die IPv4 Adresse von AWS)
- Sie sollten nun auf der Prometheus-Seite sein

#### Grafana
- Gehen Sie auf https://hub.docker.com.
- Geben Sie in der Suchleiste Prometheus ein und klicken Sie auf grafana/grafana.
  docker run -d --name=grafana -p 3000:3000 grafana/grafana
- Ist Ihr Befehl den Sie lokal für Ihr Image ausführen lassen
- Ihr Image wird nun erstellt.
- Zum Überprüfen führen Sie folgenden Befehl aus:
  docker ps -a
- Geben Sie in Ihrem Webbrowser folgendes ein:
  x.x.x.x:3000 (ersetzen Sie die x.x.x.x durch die IPv4 Adresse von AWS)
- Sie sollten nun auf der Grafana-Seite sein.
Ihre Login-Daten sind für Benutzername: admin
                      für Passwort: admin

#### Verbinden von Grafana und Prometheus
- Gehen Sie wie oben beschrieben auf Ihre Grafana-Seite
- Gehen Sie im Menü auf Connections, dann Data Source und klicken Sie anschließend auf Add Data Source
- Wählen Sie Prometheus aus und konfigurieren Sie folgendes:
  Name: beliebiger Name
  Die IP und den Port von Prometheus. zum Beispiel: 1.2.3.4:9090
- Klicken Sie auf Save & Test
- Wenn alles funktioniert, sollte ein grüner Haken erscheinen

#### Darstellen der Metriken
- Gehen Sie im Menü auf Dashboards und klicken Sie auf Create Dashboard, dann auf Add Visualisation.
- Wählen Sie Prometheus als Datenquelle aus
- Links unten können Sie ihre entsprechende Metrik auswählen.
- Klicke Sie anschließend unten rechts auf „Run queries“
- Im „Panel“  Es sollte eine Visualisierung der Metrik angezeigt werden.
- Anschließend bestätigen Sie mit Apply und klicken oben rechts auf das Diskettensymbol
- Geben Sie Ihrem Dashboard einen Namen und speichern Sie mit Save ab.

#### App-Container
- Bauen Sie Ihren App-Conatiner mit folgenden Befehlen auf Ihrer lokalen Maschine:
  docker build -t perverapp-docker-image .
  docker images  #zeigt alle Images an
  docker tag perverapp-docker-image <DockerHubUserName>/perverapp-docker-image #Tagged Ihr Image
  docker <DockerHubUserName>/push your-docker-image #Pushed Ihr Image in das Docker-Registry
- Verbinden sie Sich mit der EC2-Instanz mit dem Befehl:
  ssh -i /path/to/your/key.pem ec2-user@your-ec2-instance

  ####

  
Deploying your project to EC2, creating logs, and setting up alerts with Grafana and Loki


Deploying your project to EC2, creating logs, and setting up alerts with Grafana and Loki	1
Requirements:	1
Local:	1
AWS:	1
Build your Docker image:	2
Push your Docker image to a Docker registry:	2
SSH into your EC2 instance:	2
Install Docker on the EC2 instance:	2
Pull your Docker image:	2
Run your Docker image:	3
Install Loki and Grafana:	3


Requirements:
Local:
Clone GitHub Repository: 
git clone git@github.com:chrosue/personalverwaltung.git 
Docker installed on your local machine.
A Dockerfile that correctly defines how to build your application.

# Start from the official Node.js image
FROM node:14


# Set the working directory in the Docker image
WORKDIR /usr/src/app


# Copy package.json and package-lock.json
COPY package*.json ./


# Install dependencies
RUN npm install


# Copy the rest of the code
COPY . .


# Build the application
RUN npm run build


# Start from the official Nginx image
FROM nginx:1.21


# Copy the build output to replace the default Nginx contents.
COPY --from=0 /usr/src/app/build /usr/share/nginx/html


# Expose port 80
EXPOSE 80


# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

All necessary application code and dependencies available on your local machine.
Access to a Docker registry (like Docker Hub, Google Container Registry, or AWS ECR).
Proper authentication credentials for the Docker registry.

AWS:
An active EC2 instance.
The public IP address of the EC2 instance.
A valid key pair for accessing the EC2 instance.
SSH access to the EC2 instance.
Sudo or root privileges on the EC2 instance.
Internet access from the EC2 instance to the Docker registry.
Proper authentication credentials for the Docker registry
Sufficient resources (CPU, memory, disk space) on the server(s).
Internet access from the server(s) to download Loki and Grafana.



Build your Docker image: 

This is done on your local machine. 
docker build -t perverapp-docker-image .
 
builds a Docker image from a Dockerfile in the current directory and tags it as your-docker-image.



Tag & Push your Docker image to a Docker registry: 

docker tag perverapp-docker-image <DockerHubUserName>/perverapp-docker-image
docker <DockerHubUserName>/push your-docker-image 

pushes the image you just built to a Docker registry. This could be Docker Hub, AWS ECR, or any other Docker-compatible registry.

SSH into your EC2 instance: 
ssh -i /path/to/your/key.pem ec2-user@your-ec2-instance 

This command is used to securely connect to your EC2 instance from your local machine.

Install Docker on the EC2 instance: 

The next four commands are used to install Docker on the EC2 instance, start the Docker service, and add the ec2-user to the docker group so they can run Docker commands without sudo.

# Docker installieren
sudo yum update -y


# installiert mögliche Updates für alle installierten Pakete
sudo yum install -y docker


# installiert das Docker-Paket auf dem Rechner


sudo service docker start
# startet den Docker service


sudo usermod -a -G docker ec2-user
# fügt den Benutzer “ec2-user” der Gruppe „docker“ hinzu



Install Prometheus:
docker run -d --name prometheus-container -e TZ=UTC -p 9090:9090 ubuntu/prometheus:2.47.2-22.04_stable




http://<EC2_IP>:9090/


Install Grafana:
# Grafana installieren
docker run -d --name=grafana -p 3000:3000 grafana/grafana





http://<EC2_IP>:3000
User: admin
PW: admin
(Pw muss nach initialem Login geändert werden)



Connect Grafana & Prometheus
Login to Grafana and add data source








Build dashboard for metrics













Pull your Docker image from registry: 
(On EC2 instance)
you need to login first:
docker login


docker pull <DockerHubUsername>/perverapp-docker-image

pulls the Docker image you pushed to the registry onto the EC2 instance.


Run your Docker image: 

docker run -d -p 80:80 <DockerHubUsername>/perverapp-docker-image

runs your Docker image as a container in detached mode (-d) and maps port 80 of the container to port 80 of the host (-p 80:80).



Send Container metrics to prometheus

To collect Docker daemon metrics with Prometheus, you first need to enable the metrics endpoint in the Docker daemon. This can be done by adding the following to your Docker configuration file (/etc/docker/daemon.json):

{
  "metrics-addr" : "0.0.0.0:9323",
  "experimental" : true
}


Then restart Docker:
sudo systemctl restart docker

Now, Docker will expose its metrics at http://localhost:9323/metrics.
(make sure this port is included in AWS security group inbound rules)

Next, you need to configure Prometheus to scrape these metrics. Add the following job to the scrape_configs section of your prometheus.yml configuration file:

scrape_configs:
  - job_name: 'docker'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9323']


After updating the configuration, restart Prometheus to apply the changes.

Finally, you can visualize these metrics in Grafana by creating a new dashboard and adding panels that use Prometheus as the data source and query the Docker metrics.

Please note that exposing the Docker metrics endpoint without any access control can be a security risk, as it can provide sensitive information about your Docker system. You should secure the /metrics endpoint, for example by using a reverse proxy that requires authentication, or by limiting access to the endpoint with firewall rules.


Konfiguration von Prometheus

Öffnen einer shell des laufenden prometheus containers:
docker exec -it <container_id> /bin/bash

Navigiere in das entsprechende Verzeichnis:
cd etc/prometheus

kopiere den Inhalt der darin enthaltenen yaml Datei:
cat prometheus.yml

# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).


# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093


# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"


# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"


    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.


    static_configs:
      - targets: ["localhost:9090"]


Fügen Sie eine neue scrape_config zu Ihrer prometheus.yml hinzu, um Metriken von cAdvisor zu sammeln:


scrape_configs:
  - job_name: 'cadvisor'
    scrape_interval: 5s
    static_configs:
      - targets: ['<cadvisor_host>:8080']

Ersetzen Sie <cadvisor_host> durch die IP-Adresse oder den Hostnamen des Hosts, auf dem cAdvisor läuft.

scrape_configs: Dieser Abschnitt definiert die Ziele, von denen Prometheus Metriken sammelt.
 Es gibt zwei definierte Jobs: "prometheus" und "cadvisor". Für jeden Job gibt es eine Liste von targets, die die Adressen (IP:Port) der Ziele sind, von denen Metriken gesammelt werden. Der "prometheus" Job sammelt Metriken vom Prometheus-Server selbst, während der "cadvisor" Job Metriken vom cAdvisor-Dienst sammelt, der auf dem gleichen Host läuft und Docker-Container-Metriken bereitstellt. Der scrape_interval für den "cadvisor" Job ist auf 5 Sekunden gesetzt, was bedeutet, dass Prometheus alle 5 Sekunden Metriken von cAdvisor sammelt.

Sie können diese Datei in einem Editor Ihrer Wahl erstellen und sie dann prometheus.yml nennen.

Um diese Datei beim Starten des Prometheus-Containers zu verwenden, können Sie den -v Parameter von Docker verwenden, um das lokale Verzeichnis in den Container einzubinden. Hier ist ein Beispiel:
Altes Image und Container entfernen:
docker stop <containerid>
docker rm  <containerid>
docker rmi <imageid>
Neuen Container mit überarbeiteter yaml Datei

docker run -p 9090:9090 -v /pfad/zur/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus




Nachdem Sie diese Änderungen vorgenommen haben, starten Sie Prometheus neu, um die neue Konfiguration zu laden.

Jetzt sollte Prometheus Metriken von Ihren Docker-Containern sammeln, die von cAdvisor bereitgestellt werden. Sie können diese Metriken in der Prometheus-Web-Oberfläche anzeigen, die standardmäßig auf Port 9090 Ihres Prometheus-Hosts verfügbar ist.






