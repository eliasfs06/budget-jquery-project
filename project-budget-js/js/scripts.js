var camisetas = {
    'branca': {
        
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 5.12,
                'foto': 'v-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.95,
                'foto': 'v-white-personalized.jpg' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 4.99,
                'foto': 'normal-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.77,
                'foto': 'normal-white-personalized.jpg' 
            }
        }
    },
    
    'colorida': {
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 6.04,
                'foto': 'v-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.47,
                'foto': 'v-color-personalized.png' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 5.35,
                'foto': 'normal-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.28,
                'foto': 'normal-color-personalized.jpg' 
            }
        }
    }
}


// parâmetros da pesquisa

var parametros_pesquisa = {
    "quantidade": 1,
    "cor": "colorida",
    "gola": "gola_v",
    "qualidade": "q150",
    "estampa": "com_estampa",
    "embalagem": "bulk"
}

$(function(){
    resetInput(parametros_pesquisa);
    getPrecoFinal(parametros_pesquisa);
});

function getPrecoFinal(parametros){
    var quantidade = parametros.quantidade;
    var precoUnitario = camisetas[parametros.cor][parametros.gola][parametros.estampa].preco_unit;
    var qualidade = parametros.qualidade;
    var embalagem = parametros.embalagem;
    var precoEmbalagem = 0;

    if(qualidade == "q190"){
        precoUnitario *= 1.1;
    }

    if(embalagem == "unitaria"){
        precoEmbalagem = quantidade * 0.15;
    }

    var precoFinal = (quantidade * precoUnitario) + precoEmbalagem;
    precoFinal = roundNumber(precoFinal, 2)
    
    showAtributtes(parametros, precoFinal);    
}

function roundNumber(number, decimalPlaces){
    var roundedFloat = parseFloat(number.toFixed(decimalPlaces));
    return roundedFloat;
}

function showAtributtes(parametros, precoFinal){
    $("#valor-total").html(precoFinal);
    $("#result_gola").html($("#gola .selected").html());
    $("#result_estampa").html($('#estampa option:selected').text());
    $("#result_qualidade").html($("#qualidade .selected").html());
    $("#result_cor").html($("#cor .selected").html());
    $("#result_embalagem").html($('#embalagem option:selected').text());
    $("#result_quantidade").html($("#quantidade").val());

}

$(".option-filter div").click(function(){
    var parent = $(this).parent();
    parent.children("div").removeClass("selected");
    var children = $(this).addClass("selected");
    updateFilters(parent.attr('id'), children.attr('id'));
});

$(".single-filter select").change(function(){
    var parent = $(this);
    var children = $(this).val();
    updateFilters(parent.attr('id'), children);
})

$("#quantidade").change(function(){
    updateFilters('quantidade', $(this).val());
})

function updateFilters(key, value){
    parametros_pesquisa[key] = value;
    getPrecoFinal(parametros_pesquisa);
    updateImg(parametros_pesquisa);
}

function updateImg(parametros){
    var imgSrc = 'img/' + camisetas[parametros.cor][parametros.gola][parametros.estampa].foto;
    $("#foto-produto").attr('src', imgSrc);
}

function resetInput(parametros){

    $("#cor").children().removeClass("selected");
    var id_cor = "#" + parametros.cor;
    $(id_cor).addClass("selected");

    $("#gola").children().removeClass("selected");
    var id_gola = "#" + parametros.gola;
    $(id_gola).addClass("selected");

    $("#qualidade").children().removeClass("selected");
    var id_qualidade = "#" + parametros.qualidade;
    $(id_qualidade).addClass("selected");

    $("#estampa").attr("value", parametros.estampa);

    $("#embalagem").attr("value", parametros.embalagem);

    $("#quantidade").attr("value", parametros.quantidade);

    updateImg(parametros);
}
