sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("brasileirao.controller.Main", {
            onInit: function () {
                         
              /*  var dadosGerais = {
                   nomeCampeonato : "Brasileirão 2023 no Canal FioriNET",
                   rodada : 99  
                };
                
                var dadosModel = new JSONModel(); 
                dadosModel.setData(dadosGerais);
                var tela = this.getView();
                tela.setModel(dadosModel,"ModeloDadosGerais") */

                //definir objetos novos oara dados do campeonato, para classificação e para partidas

                var dadosGerais   = {};
                var classificacao = {};
                var partidas = {};      

                //3 modelos novos
                var dadosModel = new JSONModel();    
                var classificacaoModel = new JSONModel();
                var partidasModel = new JSONModel();

                //colocar os dados dos modelos
                dadosModel.setData(dadosGerais);
                classificacaoModel.setData(classificacao);
                partidasModel.setData(partidas);

                //atribuir modelos na tela (view)
                var tela = this.getView();

                tela.setModel(dadosModel,"ModeloDadosGerais");
                tela.setModel(classificacaoModel,"ModeloTabela");
                tela.setModel(partidasModel,"ModeloPartidas");

                //chamada da função 
                this.onBuscarClassificacao(); 
                this.onBuscarDadosGerais();

            },
            
            onBuscarClassificacao: function(){
               var oModeloTabela = this.getView().getModel("ModeloTabela")  
               
               //parametros da api
               var configuracoes = {
                url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                method : "GET",
                async : true,
                crossDomain : true,
                headers : {
                    "Authorization" : "Bearer live_bb379c39b0def734f6cfb207fec671"

                }  
               }; 
               
               //chamada da api usando AJAX
               $.ajax(configuracoes).done(
                function(response){
                   
                    //mudar os dados do model
                   oModeloTabela.setData(
                      {
                        "Classificacao" : response
                      }   

                    );

                }.bind(this) 

               ) 
               
               
            },
            onBuscarDadosGerais: function(){
                var oModeloDadosGerais = this.getView().getModel("ModeloDadosGerais")  
                
                //parametros da api
                var configuracoes = {
                 url : "https://api.api-futebol.com.br/v1/campeonatos/10",
                 method : "GET",
                 async : true,
                 crossDomain : true,
                 headers : {
                     "Authorization" : "Bearer live_bb379c39b0def734f6cfb207fec671"
 
                 }  
                }; 
              
                //chamada da api usando AJAX
                $.ajax(configuracoes).done(
                 function(response){
                     
                     //mudar os dados do model
                     /*oModeloTabela.setData(
                       {
                         "Classificacao" : response
                       }   
 
                     ); */
                     oModeloDadosGerais.setData(response);
                     var rodadaAtual = response.rodada_atual.rodada;
                     this.onBuscarPartidas(rodadaAtual);

                 }.bind(this) 
 
                ) 
                              
             },

             onBuscarPartidas: function(rodadaAtual){
                var oModeloPartidas = this.getView().getModel("ModeloPartidas")  
                
                //parametros da api
                var configuracoes = {
                 url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodadaAtual,
                 method : "GET",
                 async : true,
                 crossDomain : true,
                 headers : {
                     "Authorization" : "Bearer live_bb379c39b0def734f6cfb207fec671"
 
                 }  
                }; 
                debugger
                //chamada da api usando AJAX
                $.ajax(configuracoes).done(
                 function(response){
                     debugger
                     //mudar os dados do model
                     /*oModeloTabela.setData(
                       {
                         "Classificacao" : response
                       }   
 
                     ); */
                     oModeloPartidas.setData(response);                      

                 }.bind(this) 
 
                ) 
                              
             }

        });
    });
